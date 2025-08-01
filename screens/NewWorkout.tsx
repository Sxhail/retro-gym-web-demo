import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function NewWorkoutScreen() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('WORKOUT 1');
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  // Mock exercises data
  const mockExercises = [
    { id: 1, name: 'Bench Press', category: 'Chest', equipment: 'Barbell' },
    { id: 2, name: 'Pull Up', category: 'Back', equipment: 'Bodyweight' },
    { id: 3, name: 'Goblet Squat', category: 'Legs', equipment: 'Kettlebell' },
    { id: 4, name: 'Shoulder Press', category: 'Shoulders', equipment: 'Machine' },
    { id: 5, name: 'Crunch', category: 'Core', equipment: 'Bodyweight' },
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatElapsed = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddExercise = (exercise) => {
    setExercises(prev => [...prev, { ...exercise, sets: [{ weight: '', reps: '', completed: false }] }]);
    setModalVisible(false);
  };

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
  };

  const handleFinishWorkout = () => {
    setIsWorkoutActive(false);
    alert('Workout completed!');
    navigate('/');
  };

  const handleCancelWorkout = () => {
    if (window.confirm('Are you sure you want to cancel this workout?')) {
      navigate('/');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NEW WORKOUT</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatElapsed(elapsed)}</Text>
        </View>
      </View>

      {/* Workout Name */}
      <View style={styles.workoutNameContainer}>
        <TextInput
          style={styles.workoutNameInput}
          value={workoutName}
          onChangeText={setWorkoutName}
          placeholder="Workout Name"
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      {/* Exercises List */}
      <ScrollView style={styles.exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>{exercise.category} • {exercise.equipment}</Text>
            <View style={styles.setsContainer}>
              {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={styles.setRow}>
                  <TextInput
                    style={styles.setInput}
                    placeholder="Weight"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={set.weight}
                    onChangeText={(text) => {
                      const newExercises = [...exercises];
                      newExercises[index].sets[setIndex].weight = text;
                      setExercises(newExercises);
                    }}
                  />
                  <TextInput
                    style={styles.setInput}
                    placeholder="Reps"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={set.reps}
                    onChangeText={(text) => {
                      const newExercises = [...exercises];
                      newExercises[index].sets[setIndex].reps = text;
                      setExercises(newExercises);
                    }}
                  />
                  <TouchableOpacity
                    style={[styles.completeButton, set.completed && styles.completedButton]}
                    onPress={() => {
                      const newExercises = [...exercises];
                      newExercises[index].sets[setIndex].completed = !set.completed;
                      setExercises(newExercises);
                    }}
                  >
                    <Text style={styles.completeButtonText}>{set.completed ? '✓' : '○'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addSetButton}
                onPress={() => {
                  const newExercises = [...exercises];
                  newExercises[index].sets.push({ weight: '', reps: '', completed: false });
                  setExercises(newExercises);
                }}
              >
                <Text style={styles.addSetButtonText}>+ Add Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addExerciseButtonText}>+ ADD EXERCISE</Text>
        </TouchableOpacity>
        
        {!isWorkoutActive ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartWorkout}
          >
            <Text style={styles.startButtonText}>START WORKOUT</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.workoutButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelWorkout}
            >
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinishWorkout}
            >
              <Text style={styles.finishButtonText}>FINISH</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Exercise Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Exercise</Text>
            <ScrollView style={styles.exerciseList}>
              {mockExercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseOption}
                  onPress={() => handleAddExercise(exercise)}
                >
                  <Text style={styles.exerciseOptionName}>{exercise.name}</Text>
                  <Text style={styles.exerciseOptionDetails}>{exercise.category} • {exercise.equipment}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  backButtonText: {
    color: theme.colors.neon,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerContainer: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 8,
  },
  timerText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.code,
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutNameContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  workoutNameInput: {
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 8,
    padding: theme.spacing.md,
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
  },
  exercisesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  exerciseCard: {
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  exerciseName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseDetails: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    marginBottom: theme.spacing.md,
  },
  setsContainer: {
    gap: theme.spacing.sm,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  setInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 6,
    padding: theme.spacing.sm,
    color: theme.colors.neon,
    fontFamily: theme.fonts.code,
    fontSize: 14,
  },
  completeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.neon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButton: {
    backgroundColor: theme.colors.neon,
  },
  completeButtonText: {
    color: theme.colors.neon,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addSetButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  addSetButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.body,
    fontSize: 14,
  },
  actionButtons: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  addExerciseButton: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  addExerciseButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  startButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF4444',
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    flex: 1,
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  finishButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.backgroundOverlay,
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 16,
    padding: theme.spacing.lg,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  exerciseList: {
    maxHeight: 400,
  },
  exerciseOption: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  exerciseOptionName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseOptionDetails: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    marginTop: 2,
  },
  closeModalButton: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  closeModalButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
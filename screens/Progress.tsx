import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function ProgressScreen() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedExercise, setSelectedExercise] = useState('all');

  // Mock progress data
  const mockExercises = [
    { id: 1, name: 'Bench Press', category: 'Chest' },
    { id: 2, name: 'Squat', category: 'Legs' },
    { id: 3, name: 'Deadlift', category: 'Back' },
    { id: 4, name: 'Pull Up', category: 'Back' },
  ];

  const mockProgressData = {
    month: [
      { week: 'Week 1', weight: 135, reps: 8 },
      { week: 'Week 2', weight: 140, reps: 8 },
      { week: 'Week 3', weight: 145, reps: 7 },
      { week: 'Week 4', weight: 150, reps: 6 },
    ],
    quarter: [
      { month: 'Jan', weight: 135, reps: 8 },
      { month: 'Feb', weight: 145, reps: 7 },
      { month: 'Mar', weight: 155, reps: 6 },
    ],
    year: [
      { month: 'Jan', weight: 135, reps: 8 },
      { month: 'Feb', weight: 145, reps: 7 },
      { month: 'Mar', weight: 155, reps: 6 },
      { month: 'Apr', weight: 160, reps: 6 },
      { month: 'May', weight: 165, reps: 5 },
      { month: 'Jun', weight: 170, reps: 5 },
    ],
  };

  const currentData = mockProgressData[selectedTimeframe];
  const selectedExerciseData = selectedExercise === 'all' 
    ? mockExercises 
    : mockExercises.filter(ex => ex.id === parseInt(selectedExercise));

  const renderProgressChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Progress Chart</Text>
        <View style={styles.chartArea}>
          {currentData.map((dataPoint, index) => (
            <View key={index} style={styles.chartBar}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: (dataPoint.weight / 200) * 150,
                    backgroundColor: theme.colors.neon 
                  }
                ]} 
              />
              <Text style={styles.barLabel}>
                {selectedTimeframe === 'month' ? dataPoint.week : dataPoint.month}
              </Text>
              <Text style={styles.barValue}>{dataPoint.weight} lbs</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderStats = () => {
    const latest = currentData[currentData.length - 1];
    const first = currentData[0];
    const improvement = latest ? latest.weight - first.weight : 0;
    
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{latest ? latest.weight : 0}</Text>
          <Text style={styles.statLabel}>Current Max</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>+{improvement}</Text>
          <Text style={styles.statLabel}>Improvement</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{currentData.length}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROGRESS</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Timeframe Selector */}
      <View style={styles.timeframeContainer}>
        <TouchableOpacity
          style={[styles.timeframeTab, selectedTimeframe === 'month' && styles.activeTimeframeTab]}
          onPress={() => setSelectedTimeframe('month')}
        >
          <Text style={[styles.timeframeTabText, selectedTimeframe === 'month' && styles.activeTimeframeTabText]}>
            MONTH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeframeTab, selectedTimeframe === 'quarter' && styles.activeTimeframeTab]}
          onPress={() => setSelectedTimeframe('quarter')}
        >
          <Text style={[styles.timeframeTabText, selectedTimeframe === 'quarter' && styles.activeTimeframeTabText]}>
            QUARTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeframeTab, selectedTimeframe === 'year' && styles.activeTimeframeTab]}
          onPress={() => setSelectedTimeframe('year')}
        >
          <Text style={[styles.timeframeTabText, selectedTimeframe === 'year' && styles.activeTimeframeTabText]}>
            YEAR
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exercise Selector */}
      <View style={styles.exerciseSelector}>
        <Text style={styles.selectorLabel}>Exercise:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.exerciseChip, selectedExercise === 'all' && styles.activeExerciseChip]}
            onPress={() => setSelectedExercise('all')}
          >
            <Text style={[styles.exerciseChipText, selectedExercise === 'all' && styles.activeExerciseChipText]}>
              ALL
            </Text>
          </TouchableOpacity>
          {mockExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[styles.exerciseChip, selectedExercise === exercise.id.toString() && styles.activeExerciseChip]}
              onPress={() => setSelectedExercise(exercise.id.toString())}
            >
              <Text style={[styles.exerciseChipText, selectedExercise === exercise.id.toString() && styles.activeExerciseChipText]}>
                {exercise.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stats */}
      {renderStats()}

      {/* Progress Chart */}
      <ScrollView style={styles.contentContainer}>
        {renderProgressChart()}

        {/* Exercise List */}
        <View style={styles.exerciseListContainer}>
          <Text style={styles.sectionTitle}>Exercise Progress</Text>
          {selectedExerciseData.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => navigate(`/progress/${exercise.id}`)}
            >
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseCategory}>{exercise.category}</Text>
              </View>
              <View style={styles.exerciseProgress}>
                <Text style={styles.progressValue}>150 lbs</Text>
                <Text style={styles.progressLabel}>Current Max</Text>
              </View>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  headerSpacer: {
    width: 40,
  },
  timeframeContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  timeframeTab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  activeTimeframeTab: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderColor: theme.colors.neon,
  },
  timeframeTabText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTimeframeTabText: {
    color: theme.colors.neon,
  },
  exerciseSelector: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  selectorLabel: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  exerciseChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  activeExerciseChip: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderColor: theme.colors.neon,
  },
  exerciseChipText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeExerciseChipText: {
    color: theme.colors.neon,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  chartContainer: {
    margin: theme.spacing.lg,
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    padding: theme.spacing.lg,
  },
  chartTitle: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: theme.spacing.lg,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  barLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
  },
  barValue: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.code,
    fontSize: 10,
    marginTop: 2,
  },
  exerciseListContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseCategory: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    marginTop: 2,
  },
  exerciseProgress: {
    alignItems: 'flex-end',
    marginRight: theme.spacing.md,
  },
  progressValue: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  arrowText: {
    color: theme.colors.neon,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
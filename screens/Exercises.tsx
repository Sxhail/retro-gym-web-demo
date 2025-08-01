import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function ExercisesScreen() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock exercises data
  useEffect(() => {
    const mockExercises = [
      { id: 1, name: 'Bench Press', category: 'Chest', equipment: 'Barbell', muscleGroup: 'Pectoralis Major' },
      { id: 2, name: 'Pull Up', category: 'Back', equipment: 'Bodyweight', muscleGroup: 'Latissimus Dorsi' },
      { id: 3, name: 'Goblet Squat', category: 'Legs', equipment: 'Kettlebell', muscleGroup: 'Quadriceps' },
      { id: 4, name: 'Shoulder Press', category: 'Shoulders', equipment: 'Machine', muscleGroup: 'Deltoids' },
      { id: 5, name: 'Crunch', category: 'Core', equipment: 'Bodyweight', muscleGroup: 'Rectus Abdominis' },
      { id: 6, name: 'Deadlift', category: 'Back', equipment: 'Barbell', muscleGroup: 'Erector Spinae' },
      { id: 7, name: 'Push Up', category: 'Chest', equipment: 'Bodyweight', muscleGroup: 'Pectoralis Major' },
      { id: 8, name: 'Lunges', category: 'Legs', equipment: 'Bodyweight', muscleGroup: 'Quadriceps' },
      { id: 9, name: 'Bicep Curl', category: 'Arms', equipment: 'Dumbbell', muscleGroup: 'Biceps Brachii' },
      { id: 10, name: 'Tricep Dip', category: 'Arms', equipment: 'Bodyweight', muscleGroup: 'Triceps Brachii' },
    ];
    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
  }, []);

  // Filter exercises based on search and category
  useEffect(() => {
    let filtered = exercises;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    if (searchQuery) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredExercises(filtered);
  }, [exercises, searchQuery, selectedCategory]);

  const categories = ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'];

  const handleExercisePress = (exerciseId) => {
    navigate(`/exercises/${exerciseId}`);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EXERCISE CATALOG</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryChip, selectedCategory === category && styles.activeCategoryChip]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === category && styles.activeCategoryChipText]}>
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Exercises List */}
      <ScrollView style={styles.exercisesContainer}>
        {filteredExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => handleExercisePress(exercise.id)}
          >
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseMuscleGroup}>{exercise.muscleGroup}</Text>
            </View>
            <View style={styles.exerciseMeta}>
              <Text style={styles.exerciseCategory}>{exercise.category}</Text>
              <Text style={styles.exerciseEquipment}>{exercise.equipment}</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty State */}
      {filteredExercises.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No exercises found</Text>
          <Text style={styles.emptyStateSubtext}>
            Try adjusting your search or category filter
          </Text>
        </View>
      )}

      {/* Results Count */}
      {filteredExercises.length > 0 && (
        <View style={styles.resultsCount}>
          <Text style={styles.resultsCountText}>
            {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
          </Text>
        </View>
      )}
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
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 8,
    padding: theme.spacing.md,
    color: theme.colors.neon,
    fontFamily: theme.fonts.body,
    fontSize: 16,
  },
  categoryContainer: {
    paddingVertical: theme.spacing.md,
  },
  categoryContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  categoryChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  activeCategoryChip: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderColor: theme.colors.neon,
  },
  categoryChipText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeCategoryChipText: {
    color: theme.colors.neon,
  },
  exercisesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
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
  exerciseMuscleGroup: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    marginTop: 2,
  },
  exerciseMeta: {
    alignItems: 'flex-end',
    marginRight: theme.spacing.md,
  },
  exerciseCategory: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    backgroundColor: 'rgba(0,255,0,0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  exerciseEquipment: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 4,
  },
  arrowText: {
    color: theme.colors.neon,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  emptyStateSubtext: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 16,
    textAlign: 'center',
  },
  resultsCount: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  resultsCountText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    textAlign: 'center',
  },
});
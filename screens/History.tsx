import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function HistoryScreen() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock workout history data
  useEffect(() => {
    setWorkouts([
      {
        id: 1,
        name: 'WORKOUT 1',
        date: '2024-01-15',
        duration: 45,
        exercises: 5,
        totalSets: 20,
      },
      {
        id: 2,
        name: 'WORKOUT 2',
        date: '2024-01-12',
        duration: 38,
        exercises: 4,
        totalSets: 16,
      },
      {
        id: 3,
        name: 'WORKOUT 3',
        date: '2024-01-10',
        duration: 52,
        exercises: 6,
        totalSets: 24,
      },
      {
        id: 4,
        name: 'WORKOUT 4',
        date: '2024-01-08',
        duration: 41,
        exercises: 5,
        totalSets: 18,
      },
    ]);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleWorkoutPress = (workoutId) => {
    navigate(`/history/${workoutId}`);
  };

  const filteredWorkouts = workouts.filter(workout => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') {
      const workoutDate = new Date(workout.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return workoutDate >= weekAgo;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WORKOUT HISTORY</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, selectedFilter === 'all' && styles.activeFilterTab]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[styles.filterTabText, selectedFilter === 'all' && styles.activeFilterTabText]}>
            ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, selectedFilter === 'recent' && styles.activeFilterTab]}
          onPress={() => setSelectedFilter('recent')}
        >
          <Text style={[styles.filterTabText, selectedFilter === 'recent' && styles.activeFilterTabText]}>
            RECENT
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{workouts.length}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length)}
          </Text>
          <Text style={styles.statLabel}>Avg Duration</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {workouts.reduce((sum, w) => sum + w.totalSets, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Sets</Text>
        </View>
      </View>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsContainer}>
        {filteredWorkouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => handleWorkoutPress(workout.id)}
          >
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutDate}>{formatDate(workout.date)}</Text>
            </View>
            <View style={styles.workoutDetails}>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatValue}>{formatDuration(workout.duration)}</Text>
                <Text style={styles.workoutStatLabel}>Duration</Text>
              </View>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatValue}>{workout.exercises}</Text>
                <Text style={styles.workoutStatLabel}>Exercises</Text>
              </View>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatValue}>{workout.totalSets}</Text>
                <Text style={styles.workoutStatLabel}>Sets</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty State */}
      {filteredWorkouts.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No workouts found</Text>
          <Text style={styles.emptyStateSubtext}>Start your first workout to see it here</Text>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderColor: theme.colors.neon,
  },
  filterTabText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeFilterTabText: {
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
  workoutsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  workoutCard: {
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  workoutName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDate: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  workoutStat: {
    alignItems: 'center',
  },
  workoutStatValue: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutStatLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
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
});
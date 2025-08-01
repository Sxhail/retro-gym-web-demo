import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function TemplatesScreen() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  // Mock templates data
  useEffect(() => {
    setTemplates([
      {
        id: 1,
        name: 'Full Body Blast',
        description: 'Complete full body workout',
        exerciseCount: 5,
        estimatedTime: 45,
        category: 'Full Body',
        created_at: '2024-01-15',
      },
      {
        id: 2,
        name: 'Upper Body Focus',
        description: 'Chest, back, and shoulders',
        exerciseCount: 4,
        estimatedTime: 35,
        category: 'Upper Body',
        created_at: '2024-01-12',
      },
      {
        id: 3,
        name: 'Leg Day',
        description: 'Squats, deadlifts, and more',
        exerciseCount: 6,
        estimatedTime: 50,
        category: 'Lower Body',
        created_at: '2024-01-10',
      },
      {
        id: 4,
        name: 'Core Crusher',
        description: 'Abdominal and core focus',
        exerciseCount: 4,
        estimatedTime: 25,
        category: 'Core',
        created_at: '2024-01-08',
      },
    ]);
  }, []);

  const handleCreateTemplate = () => {
    navigate('/templates/create');
  };

  const handleTemplatePress = (templateId) => {
    navigate(`/templates/${templateId}`);
  };

  const handleDeleteTemplate = (templateId, templateName) => {
    if (window.confirm(`Are you sure you want to delete "${templateName}"?`)) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WORKOUT TEMPLATES</Text>
        <TouchableOpacity onPress={handleCreateTemplate} style={styles.createButton}>
          <Text style={styles.createButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Templates List */}
      <ScrollView style={styles.templatesContainer}>
        {templates.map((template) => (
          <View key={template.id} style={styles.templateCard}>
            <TouchableOpacity
              style={styles.templateContent}
              onPress={() => handleTemplatePress(template.id)}
            >
              <View style={styles.templateHeader}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category}</Text>
              </View>
              
              <Text style={styles.templateDescription}>{template.description}</Text>
              
              <View style={styles.templateStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{template.exerciseCount}</Text>
                  <Text style={styles.statLabel}>Exercises</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{template.estimatedTime}m</Text>
                  <Text style={styles.statLabel}>Est. Time</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{formatDate(template.created_at)}</Text>
                  <Text style={styles.statLabel}>Created</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <View style={styles.templateActions}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigate('/new', { state: { templateId: template.id } })}
              >
                <Text style={styles.startButtonText}>START</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTemplate(template.id, template.name)}
              >
                <Text style={styles.deleteButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Empty State */}
      {templates.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No templates yet</Text>
          <Text style={styles.emptyStateSubtext}>Create your first workout template to get started</Text>
          <TouchableOpacity
            style={styles.createFirstButton}
            onPress={handleCreateTemplate}
          >
            <Text style={styles.createFirstButtonText}>CREATE TEMPLATE</Text>
          </TouchableOpacity>
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
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: theme.colors.neon,
    fontSize: 24,
    fontWeight: 'bold',
  },
  templatesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  templateCard: {
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  templateContent: {
    padding: theme.spacing.lg,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  templateName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
  },
  templateCategory: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    backgroundColor: 'rgba(0,255,0,0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  templateDescription: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    marginBottom: theme.spacing.md,
  },
  templateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  templateActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  startButton: {
    flex: 1,
    backgroundColor: 'rgba(0,255,0,0.1)',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'rgba(255,0,0,0.1)',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF4444',
    fontFamily: theme.fonts.heading,
    fontSize: 14,
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
    marginBottom: theme.spacing.xl,
  },
  createFirstButton: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  createFirstButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
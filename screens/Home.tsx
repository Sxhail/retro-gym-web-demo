import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('start');
  const [templates, setTemplates] = useState<Array<{id: number, name: string, exerciseCount: number}>>([]);

  // Mock templates for web demo
  useEffect(() => {
    setTemplates([
      { id: 1, name: 'Full Body Blast', exerciseCount: 5 },
      { id: 2, name: 'Upper Body Focus', exerciseCount: 4 },
      { id: 3, name: 'Leg Day', exerciseCount: 6 },
    ]);
  }, []);

  // Handle template deletion
  const handleDeleteTemplate = async (templateId: number, templateName: string) => {
    if (window.confirm(`Are you sure you want to delete "${templateName}"? This action cannot be undone.`)) {
      try {
        // Mock deletion for web demo
        const updatedTemplates = templates.filter(tpl => tpl.id !== templateId);
        setTemplates(updatedTemplates);
      } catch (err) {
        alert('Error: Failed to delete template. Please try again.');
      }
    }
  };

  // Template preview: just show template name for now
  const renderTemplatePreview = (template: any) => {
    return template.name;
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* SYSTEM ONLINE and protocol banner at very top */}
      <View style={{ width: '100%', alignItems: 'flex-start', marginTop: theme.spacing.xs, marginBottom: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, marginLeft: 16, marginTop: 4 }}>
          <View style={{ width: 12, height: 12, backgroundColor: theme.colors.neon, borderRadius: 2, marginRight: 8 }} />
          <Text style={{ color: theme.colors.neon, fontFamily: theme.fonts.code, fontSize: 14, letterSpacing: 1 }}>
            SYSTEM ONLINE
          </Text>
        </View>
        <Text style={{ color: theme.colors.neon, fontFamily: theme.fonts.code, fontSize: 13, marginBottom: 2, letterSpacing: 1, marginLeft: 16 }}>
          RETRO FITNESS PROTOCOL
        </Text>
        <View style={{ height: 1, backgroundColor: theme.colors.neon, width: '100%', opacity: 0.7, marginTop: 4 }} />
      </View>
      
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>GYM.TRACKER</Text>
      </View>

      {/* Center Image */}
      <View style={styles.imageContainer}>
        <div style={{
          width: 350,
          height: 350,
          opacity: 0.8,
          background: 'linear-gradient(45deg, #1DB954, #00FF41)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontFamily: 'Orbitron_700Bold, monospace',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
          RETRO GYM
        </div>
      </View>

      {/* Templates Preview List */}
      {templates.length > 0 && (
        <View style={{ width: '100%', marginBottom: 16 }}>
          {templates.map((tpl) => (
            <View key={tpl.id} style={styles.templateItem}>
              <TouchableOpacity
                style={styles.templateButton}
                onPress={() => navigate(`/templates/${tpl.id}`)}
              >
                <Text style={styles.templateName}>{renderTemplatePreview(tpl)}</Text>
                <Text style={styles.templateCount}>{tpl.exerciseCount} exercises</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTemplate(tpl.id, tpl.name)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Bottom Action Section */}
      <View style={styles.bottomActionSection}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigate('/new')}
        >
          <Text style={styles.startButtonText}>START NEW WORKOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const BottomNav = ({ activeTab, onTabPress }: { activeTab: string, onTabPress: (tab: string) => void }) => {
  const navigate = useNavigate();
  
  const handleTabPress = (tab: string) => {
    onTabPress(tab);
    switch (tab) {
      case 'start':
        navigate('/');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'progress':
        navigate('/progress');
        break;
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'start' && styles.activeNavButton]}
        onPress={() => handleTabPress('start')}
      >
        <Text style={[styles.navButtonText, activeTab === 'start' && styles.activeNavButtonText]}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'history' && styles.activeNavButton]}
        onPress={() => handleTabPress('history')}
      >
        <Text style={[styles.navButtonText, activeTab === 'history' && styles.activeNavButtonText]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, activeTab === 'progress' && styles.activeNavButton]}
        onPress={() => handleTabPress('progress')}
      >
        <Text style={[styles.navButtonText, activeTab === 'progress' && styles.activeNavButtonText]}>Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 0,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.display,
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  centerImage: {
    width: 350,
    height: 350,
    opacity: 0.8,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
  },
  templateButton: {
    flex: 1,
    backgroundColor: 'rgba(0,255,0,0.05)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
  templateName: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontSize: 16,
    fontWeight: 'bold',
  },
  templateCount: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 6,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomActionSection: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: 80,
    marginTop: 'auto',
  },
  startButton: {
    backgroundColor: 'rgba(0, 255, 0, 0.15)',
    borderWidth: 1,
    borderColor: theme.colors.neon,
    borderRadius: 12,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  startButtonText: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.display,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundOverlay,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  activeNavButton: {
    backgroundColor: 'rgba(0,255,0,0.1)',
  },
  navButtonText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.body,
    fontSize: 14,
  },
  activeNavButtonText: {
    color: theme.colors.neon,
    fontWeight: 'bold',
  },
});
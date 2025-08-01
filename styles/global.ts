import theme from './theme';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Main app background
  appBackground: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  // Neon text
  neonText: {
    color: theme.colors.neon,
    textShadowColor: '#00FF41',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  // Card style
  card: {
    backgroundColor: theme.colors.backgroundOverlay,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    shadowColor: theme.shadows.card.shadowColor,
    shadowOffset: theme.shadows.card.shadowOffset,
    shadowOpacity: theme.shadows.card.shadowOpacity,
    shadowRadius: theme.shadows.card.shadowRadius,
    elevation: theme.shadows.card.elevation,
  },
  // Button style
  neonButton: {
    backgroundColor: 'rgba(0,255,0,0.08)',
    borderColor: theme.colors.neon,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    shadowColor: theme.shadows.button.shadowColor,
    shadowOffset: theme.shadows.button.shadowOffset,
    shadowOpacity: theme.shadows.button.shadowOpacity,
    shadowRadius: theme.shadows.button.shadowRadius,
    elevation: theme.shadows.button.elevation,
  },
  // Section title
  sectionTitle: {
    color: theme.colors.neon,
    fontFamily: theme.fonts.heading,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
  },
});

export default globalStyles;
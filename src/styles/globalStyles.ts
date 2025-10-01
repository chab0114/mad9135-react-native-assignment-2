// src/styles/globalStyles.ts

import { StyleSheet } from 'react-native';

// Dota 2 inspired color palette
export const colors = {
  background: '#1a1a1a',
  backgroundSecondary: '#242424',
  primary: '#ffd700',
  primaryDark: '#d4af37',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#888888',
  border: '#333333',
  borderLight: '#444444',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
};

// Global reusable styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
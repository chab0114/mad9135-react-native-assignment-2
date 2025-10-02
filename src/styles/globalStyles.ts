import { StyleSheet } from 'react-native';

// Color palette
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

// HomeScreen styles
export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  userItem: {
    padding: 15,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  userItemIOS: {
    flexDirection: 'row-reverse',
  },
  userItemAndroid: {
    flexDirection: 'row',
  },
  avatarIOS: {
    marginLeft: 15,
  },
  avatarAndroid: {
    marginRight: 15,
  },
  avatarSquare: {
    borderRadius: 8,
  },
  nameContainer: {
    flex: 1,
  },
  firstName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  lastName: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  deleteButton: {
  backgroundColor: colors.backgroundSecondary, // Dark background instead of red
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: 100,
  paddingRight: 20,
  borderLeftWidth: 3,
  borderLeftColor: colors.error, // Red accent line
},
deleteText: {
  color: colors.error, // Red text instead of white
  fontWeight: 'bold',
  fontSize: 16,
},
});
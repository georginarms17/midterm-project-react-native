import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
};

export function createStyles(colors: ScreenColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 14,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '800',
    },
    subtitle: {
      color: colors.mutedText,
      marginTop: 4,
    },
    formContainer: {
      marginTop: 16,
    },
    submitButton: {
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    submitButtonDisabled: {
      backgroundColor: colors.border,
    },
    submitButtonText: {
      color: colors.text,
      fontWeight: '800',
    },
  });
}

import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  primary: string;
  danger: string;
  mutedText: string;
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
    savedButton: {
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
    savedIcon: {
      color: colors.primary,
      fontSize: 18,
    },
    loadingContainer: {
      marginTop: 20,
    },
    errorText: {
      color: colors.danger,
      marginTop: 16,
    },
    list: {
      marginTop: 14,
    },
    emptyText: {
      color: colors.mutedText,
      marginTop: 20,
    },
  });
}

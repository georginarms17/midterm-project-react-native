import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  text: string;
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
    emptyState: {
      marginTop: 48,
      alignItems: 'center',
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
    },
    emptySubtitle: {
      color: colors.mutedText,
      marginTop: 8,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
}

import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  card: string;
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
    keyboardAvoid: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    container: {
      padding: 14,
    },
    heroCard: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.card,
      padding: 14,
      marginBottom: 4,
    },
    heroRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heroIconBadge: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    heroTextBlock: {
      flex: 1,
      marginLeft: 10,
    },
    heroEyebrow: {
      color: colors.mutedText,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    heroTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '800',
    },
    heroSubtitle: {
      color: colors.mutedText,
      marginTop: 4,
      fontSize: 14,
      fontWeight: '600',
    },
    instruction: {
      color: colors.mutedText,
      marginTop: 10,
      marginHorizontal: 6,
      fontSize: 16,
      lineHeight: 18,
    },
    themeButton: {
      paddingHorizontal: 6,
      marginHorizontal: 10,
    },
    formContainer: {
      marginTop: 16,
    },
    inputLabel: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 6,
      marginHorizontal: 4,
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

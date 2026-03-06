import { StyleSheet } from 'react-native';

type ModalColors = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  danger: string;
};

export function createStyles(colors: ModalColors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      paddingHorizontal: 18,
      paddingVertical: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '800',
      lineHeight: 24,
    },
    message: {
      color: colors.mutedText,
      marginTop: 10,
      lineHeight: 22,
      fontSize: 14,
    },
    actionsRow: {
      marginTop: 20,
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      flex: 1,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    dangerButton: {
      backgroundColor: colors.danger,
    },
    secondaryButton: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    primaryButtonText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 14,
    },
    secondaryButtonText: {
      color: colors.text,
      fontWeight: '700',
      fontSize: 14,
    },
  });
}

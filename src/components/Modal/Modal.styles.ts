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
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    card: {
      width: '100%',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      padding: 16,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '800',
    },
    message: {
      color: colors.mutedText,
      marginTop: 8,
      lineHeight: 20,
    },
    actionsRow: {
      marginTop: 16,
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
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
      backgroundColor: colors.background,
    },
    primaryButtonText: {
      color: colors.text,
      fontWeight: '700',
    },
    secondaryButtonText: {
      color: colors.text,
      fontWeight: '700',
    },
  });
}

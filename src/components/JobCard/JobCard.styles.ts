import { StyleSheet } from 'react-native';

type ComponentColors = {
  card: string;
  border: string;
  text: string;
  mutedText: string;
  primary: string;
  danger: string;
};

export function createStyles(colors: ComponentColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    subtitle: {
      color: colors.mutedText,
      marginTop: 4,
    },
    salary: {
      color: colors.mutedText,
      marginTop: 4,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 12,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    saveButtonDisabled: {
      backgroundColor: colors.border,
    },
    removeButton: {
      backgroundColor: colors.danger,
    },
    applyButton: {
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      color: colors.text,
      fontWeight: '700',
    },
  });
}

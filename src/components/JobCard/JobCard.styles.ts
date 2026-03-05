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
      padding: 18,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    titleContainer: {
      flex: 1,
      paddingRight: 12,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: colors.card,
    },
    saveTopButton: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 50,
      alignSelf: 'flex-start',
    },
    saveTopButtonDisabled: {
      opacity: 0.7,
    },
    saveTopButtonText: {
      color: '#ffffff',
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
      backgroundColor: colors.primary,
    },
    detailButton: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: '#f5f5f5',
      fontWeight: '700',
    },
  });
}

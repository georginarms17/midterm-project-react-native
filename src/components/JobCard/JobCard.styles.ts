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
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      color: colors.text,
      fontSize: 18,
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
    subtitle: {
      color: colors.mutedText,
      marginTop: 4,
    },
    salary: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    salaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    infoPillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      gap: 8,
    },
    infoPill: {
      backgroundColor: colors.border,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      flexGrow: 1,
      minWidth: '30%',
      alignItems: 'center',
    },
    infoPillText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
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
    detailButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: '#f5f5f5',
      fontSize: 14,
      fontWeight: '700',
    },
  });
}

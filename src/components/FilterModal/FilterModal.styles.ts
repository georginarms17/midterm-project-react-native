import { StyleSheet } from 'react-native';

type Colors = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  danger: string;
};

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      paddingHorizontal: 16,
      paddingBottom: 30,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    closeButton: {
      padding: 8,
    },
    closeText: {
      fontSize: 24,
      color: colors.text,
    },
    filterSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.border,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '600',
    },
    chipTextActive: {
      color: '#ffffff',
    },
    rangeContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    rangeInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: colors.text,
      fontSize: 12,
    },
    rangeDelete: {
      fontSize: 18,
      color: colors.danger,
      padding: 8,
    },
    scrollView: {
      maxHeight: '70%',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: '600',
      fontSize: 14,
    },
    clearButton: {
      backgroundColor: colors.border,
    },
    clearButtonText: {
      color: colors.text,
    },
    applyButton: {
      backgroundColor: colors.primary,
    },
    applyButtonText: {
      color: '#ffffff',
    },
  });
}

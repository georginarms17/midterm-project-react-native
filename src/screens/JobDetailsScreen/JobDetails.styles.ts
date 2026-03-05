import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  danger: string;
};

export function createStyles(colors: ScreenColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 14,
    },
    scrollContent: {
      paddingBottom: 140,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 14,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: 16,
      color: colors.mutedText,
      marginBottom: 8,
    },
    logo: {
      width: 64,
      height: 64,
      borderRadius: 12,
      backgroundColor: colors.card,
      marginRight: 12,
    },
    themeButton: {
      paddingHorizontal: 6,
      marginHorizontal: 10,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
      marginLeft: 6,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      marginHorizontal: 6,
      paddingVertical: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.mutedText,
      width: 100,
    },
    value: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginBottom: 8,
    },
    tagText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '600',
    },
    descriptionText: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
    },
    actionsRowFixed: {
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    saveButtonDisabled: {
      backgroundColor: colors.border,
    },
    applyButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 14,
    },
    buttonTextDisabled: {
      color: colors.mutedText,
    },
  });
}

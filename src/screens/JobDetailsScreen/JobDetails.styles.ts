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
    container: {
      flex: 1,
      padding: 14,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    scrollContent: {
      paddingBottom: 10,
    },
    header: {
      alignItems: 'center',
      marginBottom: 18,
      backgroundColor: '#aca9d60f', 
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 16,
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
      textAlign: 'center',
    },
    company: {
      fontSize: 16,
      color: colors.mutedText,
      marginBottom: 10,
      textAlign: 'center',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    locationText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.mutedText,
      textAlign: 'center',
    },
    logoCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      marginBottom: 10,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
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
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 10,
    },
    gridItem: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      minHeight: 84,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    gridContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    gridTextBlock: {
      flex: 1,
      justifyContent: 'center',
    },
    gridLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.mutedText,
      marginBottom: 4,
      textAlign: 'left',
      alignSelf: 'auto',
    },
    gridIcon: {
      marginRight: 0,
    },
    gridIconBadge: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    gridValue: {
      fontSize: 18,
      color: colors.primary,
      fontWeight: '800',
      textAlign: 'left',
    },
    salaryCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      minHeight: 84,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    salaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    salaryLabelRow: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.mutedText,
      marginRight: 20,
    },
    salaryValueRow: {
      fontSize: 18,
      color: colors.primary,
      fontWeight: '800',
      textAlign: 'left',
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
      justifyContent: 'center',
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
      margin: 4,
    },
    dateGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    dateCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dateLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.mutedText,
      marginBottom: 6,
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

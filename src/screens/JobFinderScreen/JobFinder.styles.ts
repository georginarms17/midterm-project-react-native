import { StyleSheet } from 'react-native';

type ScreenColors = {
  background: string;
  primary: string;
  danger: string;
  mutedText: string;
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
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInputWrap: {
      flex: 1,
    },
    filterButton: {
      padding: 8,
      marginLeft: 10,
    },
    headerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      gap: 12,
    },
    savedButton: {
      paddingHorizontal: 6,
    },
    themeButton: {
      paddingHorizontal: 6,
    },
    loadingContainer: {
      marginTop: 20,
    },
    errorText: {
      color: colors.danger,
      marginTop: 16,
    },
    list: {
      flex: 1,
      marginTop: 14,
    },
    emptyText: {
      color: colors.mutedText,
      marginTop: 20,
    },
  });
}

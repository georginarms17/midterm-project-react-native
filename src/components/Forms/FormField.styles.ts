import { StyleSheet } from 'react-native';

type ComponentColors = {
  card: string;
  border: string;
  text: string;
  mutedText: string;
  danger: string;
};

export function createStyles(colors: ComponentColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    input: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: colors.text,
    },
    inputError: {
      borderColor: colors.danger,
    },
    multilineInput: {
      minHeight: 90,
    },
    errorText: {
      color: colors.danger,
      marginTop: 6,
    },
  });
}

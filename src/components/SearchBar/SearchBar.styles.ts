import { StyleSheet } from 'react-native';

type ComponentColors = {
  border: string;
  card: string;
  text: string;
};

export function createStyles(colors: ComponentColors) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.card,
    },
    input: {
      color: colors.text,
    },
  });
}

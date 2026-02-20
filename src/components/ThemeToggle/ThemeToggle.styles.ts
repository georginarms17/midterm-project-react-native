import { StyleSheet } from 'react-native';

type ComponentColors = {
  card: string;
  border: string;
  text: string;
};

export function createStyles(colors: ComponentColors) {
  return StyleSheet.create({
    button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    text: {
      color: colors.text,
    },
  });
}

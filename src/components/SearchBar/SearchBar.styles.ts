import { StyleSheet } from 'react-native';

type ComponentColors = {
  border: string;
  card: string;
  text: string;
  primary: string;
};

export function createStyles(colors: ComponentColors) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingHorizontal: 12,
      backgroundColor: colors.card,
      minHeight: 40,
      justifyContent: 'center',
    },
    inputContainer: {
      flex: 1,
    },
    input: {
      color: colors.text,
      height: 40,
      paddingVertical: 6,
    },
  });
}

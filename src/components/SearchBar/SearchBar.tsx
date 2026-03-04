import React from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './SearchBar.styles';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search jobs...',
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          style={styles.input}
        />
      </View>
    </View>
  );
}

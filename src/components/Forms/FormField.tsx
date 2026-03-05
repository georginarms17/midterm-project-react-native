import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { createStyles } from './FormField.styles';

export default function FormField({
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  touched,
  multiline,
}: {
  value: string;
  onChangeText: (t: string) => void;
  onBlur: TextInputProps['onBlur'];
  placeholder: string;
  error?: string;
  touched?: boolean;
  multiline?: boolean;
}) {
  const { colors } = useTheme();
  const styles = useThemeStyles(createStyles);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        multiline={multiline}
        style={[styles.input, touched && error && styles.inputError, multiline && styles.multilineInput]}
      />
      {touched && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

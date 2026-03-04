import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './ThemeToggle.styles';

export default function ThemeToggle() {
  const { mode, toggleMode, colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable onPress={toggleMode} style={styles.button}>
      <Text style={styles.text}>{mode === 'light' ? 'Dark' : 'Light'}</Text>
    </Pressable>
  );
}

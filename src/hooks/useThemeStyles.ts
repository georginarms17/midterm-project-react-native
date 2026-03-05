import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Custom hook that combines useTheme with style creation
 * Eliminates the repetitive pattern of useTheme + useMemo(createStyles)
 */
export function useThemeStyles<T>(
  createStyles: (colors: ReturnType<typeof useTheme>['colors']) => T
): T {
  const { colors } = useTheme();
  return useMemo(() => createStyles(colors), [colors]);
}

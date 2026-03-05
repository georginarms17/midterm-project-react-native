import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

interface ScreenHeaderConfig {
  title: string;
  colors: {
    background: string;
    text: string;
  };
  headerLeft?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  headerBackTitle?: string;
}

export function buildScreenHeader(config: ScreenHeaderConfig): NativeStackNavigationOptions {
  const { title, colors, headerLeft, headerRight, headerBackTitle = '' } = config;

  return {
    headerTitle: title,
    headerTitleAlign: 'left',
    ...(headerBackTitle !== undefined && { headerBackTitle }),
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      color: colors.text,
      fontSize: 24,
      fontWeight: '800',
    },
    ...(headerLeft && { headerLeft }),
    ...(headerRight && { headerRight }),
  };
}

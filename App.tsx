import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { SavedJobsProvider } from './src/context/SavedJobsContext';

export default function App() {
  return (
    <ThemeProvider>
      <SavedJobsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SavedJobsProvider>
    </ThemeProvider>
  );
}

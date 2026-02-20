import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import { RootStackParamList } from './props';

import JobFinderScreen from '../screens/JobFinderScreen/JobFinder';
import SavedJobsScreen from '../screens/SavedJobsScreen/SavedJobs';
import ApplyScreen from '../screens/ApplicationFormScreen/ApplicationForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.JOB_FINDER} component={JobFinderScreen} options={{ title: 'Job Finder' }} />
      <Stack.Screen name={ROUTES.SAVED_JOBS} component={SavedJobsScreen} options={{ title: 'Saved Jobs' }} />
      <Stack.Screen name={ROUTES.APPLICATION_FORM} component={ApplyScreen} options={{ title: 'Application Form' }} />
    </Stack.Navigator>
  );
}

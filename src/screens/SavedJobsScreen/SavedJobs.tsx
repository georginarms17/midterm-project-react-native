import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { useSavedJobs } from '../../context/SavedJobsContext';
import { useTheme } from '../../context/ThemeContext';
import { Job } from '../../models/Job';

import JobCard from '../../components/JobCard/JobCard';
import Modal from '../../components/Modal/Modal';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { createStyles } from './SavedJobs.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.SAVED_JOBS>;

export default function SavedJobsScreen({ navigation }: Props) {
  const { savedJobs, removeJob } = useSavedJobs();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [jobToRemove, setJobToRemove] = useState<Job | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggle />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              showRemove
              onRemove={() => setJobToRemove(item)}
              onApply={() => navigation.navigate(ROUTES.APPLICATION_FORM, { job: item, fromSaved: true })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No saved jobs yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap Save Job on Job Finder to keep jobs here for quick access.
              </Text>
            </View>
          }
        />
      </View>
      <Modal
        visible={!!jobToRemove}
        title="Remove Saved Job?"
        message={
          jobToRemove
            ? `Remove "${jobToRemove.title}" from your saved jobs list?`
            : ''
        }
        confirmText="Remove"
        confirmVariant="danger"
        cancelText="Cancel"
        showCancel
        onConfirm={() => {
          if (jobToRemove) removeJob(jobToRemove.id);
          setJobToRemove(null);
        }}
        onCancel={() => setJobToRemove(null)}
      />
    </SafeAreaView>
  );
}

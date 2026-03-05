import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, Pressable } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { useSavedJobs } from '../../context/SavedJobsContext';
import { useTheme } from '../../context/ThemeContext';
import { buildScreenHeader } from '../../hooks/useScreenHeader';
import { Job } from '../../models/Job';

import JobCard from '../../components/JobCard/JobCard';
import Modal from '../../components/Modal/Modal';
import { createStyles } from './SavedJobs.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.SAVED_JOBS>;

export default function SavedJobsScreen({ navigation }: Props) {
  const { savedJobs, removeJob } = useSavedJobs();
  const { colors, toggleMode, mode } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [jobToRemove, setJobToRemove] = useState<Job | null>(null);
  const [removeSuccessVisible, setRemoveSuccessVisible] = useState(false);
  const [removedJobTitle, setRemovedJobTitle] = useState('');

  useLayoutEffect(() => {
    const headerOptions = buildScreenHeader({
      title: 'Saved Jobs',
      colors,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={colors.text} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={toggleMode} style={styles.themeButton}>
          <Icon name={mode === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
        </Pressable>
      ),
    });
    navigation.setOptions(headerOptions);
  }, [navigation, colors, toggleMode, mode, styles]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <JobCard
              job={item}
              showRemove
              onRemove={() => setJobToRemove(item)}
              onViewDetails={() => navigation.navigate(ROUTES.JOB_DETAILS, { job: item })}
            />
          )}
          contentContainerStyle={{ flexGrow: 1, padding: 14 }}
          ListEmptyComponent={
            <View style={[styles.emptyState, { flex: 1 }]}>
              <Text style={styles.emptyTitle}>No saved jobs yet!</Text>
              <Text style={styles.emptySubtitle}>
                Tap Save Button on Job Finder Screen to keep jobs here for quick access.
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
          if (jobToRemove) {
            removeJob(jobToRemove.id);
            setRemovedJobTitle(jobToRemove.title);
            setRemoveSuccessVisible(true);
          }
          setJobToRemove(null);
        }}
        onCancel={() => setJobToRemove(null)}
      />

      <Modal
        visible={removeSuccessVisible}
        title="Removed"
        message={removedJobTitle ? `"${removedJobTitle}" was removed from saved jobs.` : ''}
        confirmText="OK"
        onConfirm={() => setRemoveSuccessVisible(false)}
        onCancel={() => setRemoveSuccessVisible(false)}
      />
    </SafeAreaView>
  );
}

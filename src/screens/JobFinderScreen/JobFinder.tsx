import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { fetchJobs } from '../../api/jobsAPI';
import { Job } from '../../models/Job';
import { useTheme } from '../../context/ThemeContext';

import JobCard from '../../components/JobCard/JobCard';
import Modal from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/SearchBar';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { createStyles } from './JobFinder.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.JOB_FINDER>;

export default function JobFinderScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saveSuccessVisible, setSaveSuccessVisible] = useState(false);
  const [savedJobTitle, setSavedJobTitle] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggle />,
      headerLeft: () => (
        <Pressable style={styles.savedButton} onPress={() => navigation.navigate(ROUTES.SAVED_JOBS)}>
          <Text style={styles.savedIcon}>{'\u{1F516}'}</Text>
        </Pressable>
      ),
    });
  }, [navigation, styles, colors.primary]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const list = await fetchJobs();
        if (mounted) setJobs(list);
      } catch (e: any) {
        if (mounted) setErrorMsg(e?.message ?? 'Failed to load jobs');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((j) =>
      `${j.title} ${j.company} ${j.location ?? ''}`.toLowerCase().includes(q)
    );
  }, [jobs, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar value={query} onChangeText={setQuery} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard
                job={item}
                onSaveSuccess={(savedJob) => {
                  setSavedJobTitle(savedJob.title);
                  setSaveSuccessVisible(true);
                }}
                onApply={() => navigation.navigate(ROUTES.APPLICATION_FORM, { job: item, fromSaved: false })}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No jobs found.
              </Text>
            }
          />
        )}
      </View>
      <Modal
        visible={saveSuccessVisible}
        title="Saved Job"
        message={`"${savedJobTitle}" was added to your saved jobs.`}
        confirmText="Nice"
        onConfirm={() => setSaveSuccessVisible(false)}
        onCancel={() => setSaveSuccessVisible(false)}
      />
    </SafeAreaView>
  );
}

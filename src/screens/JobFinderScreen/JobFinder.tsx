import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { fetchJobs } from '../../api/jobsAPI';
import { Job } from '../../models/Job';
import { useTheme } from '../../context/ThemeContext';
import { buildScreenHeader } from '../../hooks/useScreenHeader';

import JobCard from '../../components/JobCard/JobCard';
import Modal from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterModal, { Filters } from '../../components/FilterModal/FilterModal';
import { createStyles } from './JobFinder.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.JOB_FINDER>;

export default function JobFinderScreen({ navigation }: Props) {
  const { colors, toggleMode, mode } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saveSuccessVisible, setSaveSuccessVisible] = useState(false);
  const [savedJobTitle, setSavedJobTitle] = useState('');
  const [removeSuccessVisible, setRemoveSuccessVisible] = useState(false);
  const [removedJobTitle, setRemovedJobTitle] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    jobTypes: [],
    workModels: [],
    seniorityLevels: [],
    mainCategories: [],
  });

  useLayoutEffect(() => {
    const headerOptions = buildScreenHeader({
      title: 'Job Finder',
      colors,
      headerLeft: () => null,
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Pressable style={styles.savedButton} onPress={() => navigation.navigate(ROUTES.SAVED_JOBS)}>
            <Icon name="bookmark" size={24} color={colors.primary} />
          </Pressable>
          <Pressable onPress={toggleMode} style={styles.themeButton}>
            <Icon name={mode === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
          </Pressable>
        </View>
      ),
      headerBackTitle: undefined,
    });
    navigation.setOptions(headerOptions);
  }, [navigation, styles, colors, toggleMode, mode]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const list = await fetchJobs();
        if (mounted) setJobs(list);
      } catch (e: unknown) {
        if (mounted) {
          const message = e instanceof Error ? e.message : 'Failed to load jobs';
          setErrorMsg(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Apply search filter
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((j) =>
        `${j.title} ${j.company} ${j.location ?? ''}`.toLowerCase().includes(q)
      );
    }

    // Apply category filters
    if (filters.jobTypes.length > 0) {
      result = result.filter((j) => filters.jobTypes.includes(j.jobType || ''));
    }

    if (filters.workModels.length > 0) {
      result = result.filter((j) => filters.workModels.includes(j.workModel || ''));
    }

    if (filters.seniorityLevels.length > 0) {
      result = result.filter((j) => filters.seniorityLevels.includes(j.seniorityLevel || ''));
    }

    if (filters.mainCategories.length > 0) {
      result = result.filter((j) => filters.mainCategories.includes(j.mainCategory || ''));
    }

    return result;
  }, [jobs, query, filters]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <SearchBar value={query} onChangeText={setQuery} />
          </View>
          <Pressable onPress={() => setFilterModalVisible(true)} style={{ padding: 8, marginLeft: 10 }}>
            <Icon name="filter" size={22} color={colors.primary} />
          </Pressable>
        </View>
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
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <JobCard
                job={item}
                onSaveSuccess={(savedJob) => {
                  setSavedJobTitle(savedJob.title);
                  setSaveSuccessVisible(true);
                }}
                onViewDetails={() => navigation.navigate(ROUTES.JOB_DETAILS, { job: item })}
                onRemoveSuccess={(removedJob) => {
                  setRemovedJobTitle(removedJob.title);
                  setRemoveSuccessVisible(true);
                }}
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
      <Modal
        visible={removeSuccessVisible}
        title="Removed"
        message={removedJobTitle ? `"${removedJobTitle}" was removed from saved jobs.` : ''}
        confirmText="OK"
        onConfirm={() => setRemoveSuccessVisible(false)}
        onCancel={() => setRemoveSuccessVisible(false)}
      />
      <FilterModal
        visible={filterModalVisible}
        jobs={jobs}
        onApply={(newFilters) => setFilters(newFilters)}
        onClose={() => setFilterModalVisible(false)}
      />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

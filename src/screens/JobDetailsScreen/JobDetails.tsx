import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { useTheme } from '../../context/ThemeContext';
import { useSavedJobs } from '../../context/SavedJobsContext';
import Modal from '../../components/Modal/Modal';
import { createStyles } from './JobDetails.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.JOB_DETAILS>;

export default function JobDetailsScreen({ route, navigation }: Props) {
  const { job } = route.params;
  const { colors } = useTheme();
  const { saveJob, removeJob, isSaved } = useSavedJobs();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [saveSuccessVisible, setSaveSuccessVisible] = useState(false);
  const [removeSuccessVisible, setRemoveSuccessVisible] = useState(false);

  const saved = isSaved(job.id);

  const handleSave = () => {
    if (saved) {
      removeJob(job.id);
      setRemoveSuccessVisible(true);
    } else {
      saveJob(job);
      setSaveSuccessVisible(true);
    }
  };

  const handleApply = () => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSaved: false });
  };

  const formatSalary = () => {
    if (job.salary) return job.salary;
    if (job.minSalary && job.maxSalary) {
      return `${job.minSalary} - ${job.maxSalary} ${job.currency || 'EUR'}`;
    }
    if (job.minSalary) {
      return `${job.minSalary} ${job.currency || 'EUR'}`;
    }
    if (job.maxSalary) {
      return `${job.maxSalary} ${job.currency || 'EUR'}`;
    }
    return 'Not specified';
  };

  const stripHtmlTags = (html: string) => {
    if (!html) return '';
    // Convert common block tags to newlines, list items to bullets, then strip remaining tags
    let s = html.replace(/<br\s*\/?>/gi, '\n');
    s = s.replace(/<\/p>/gi, '\n');
    s = s.replace(/<li>/gi, '\n- ');
    s = s.replace(/<\/li>/gi, '\n');
    s = s.replace(/<[^>]*>/g, '');
    s = s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    // Collapse multiple newlines
    s = s.replace(/\n{2,}/g, '\n\n');
    return s.trim();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header with company logo */}
        <View style={styles.header}>
          {job.companyLogo && (
            <Image source={{ uri: job.companyLogo }} style={styles.logo} resizeMode="contain" />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
          </View>
        </View>

        {/* Main details card */}
        <View style={styles.section}>
          <View style={styles.card}>
            {job.mainCategory && (
              <View style={styles.row}>
                <Text style={styles.label}>Category</Text>
                <Text style={styles.value}>{job.mainCategory}</Text>
              </View>
            )}
            {job.jobType && (
              <View style={styles.row}>
                <Text style={styles.label}>Job Type</Text>
                <Text style={styles.value}>{job.jobType}</Text>
              </View>
            )}
            {job.workModel && (
              <View style={styles.row}>
                <Text style={styles.label}>Work Model</Text>
                <Text style={styles.value}>{job.workModel}</Text>
              </View>
            )}
            {job.seniorityLevel && (
              <View style={styles.row}>
                <Text style={styles.label}>Seniority</Text>
                <Text style={styles.value}>{job.seniorityLevel}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>Salary</Text>
              <Text style={styles.value}>{formatSalary()}</Text>
            </View>
            {job.locations && job.locations.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>{job.locations.join(', ')}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Tags</Text>
            <View style={styles.tagContainer}>
              {job.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description */}
        {job.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.card}>
              <Text style={styles.descriptionText}>
                {stripHtmlTags(job.description)}
              </Text>
            </View>
          </View>
        )}

        {/* Additional info - only render if there is content */}
        {(job.pubDate || job.expiryDate) && (
          <View style={styles.section}>
            <View style={styles.card}>
              {job.pubDate && (
                <View style={styles.row}>
                  <Text style={styles.label}>Posted</Text>
                  <Text style={styles.value}>
                    {new Date(job.pubDate * 1000).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {job.expiryDate && (
                <View style={styles.row}>
                  <Text style={styles.label}>Expires</Text>
                  <Text style={styles.value}>
                    {new Date(job.expiryDate * 1000).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Fixed action buttons at bottom */}
      <View style={styles.actionsRowFixed}>
        <Pressable
          onPress={handleSave}
          style={[styles.actionButton, styles.saveButton]}
        >
          <Text style={styles.buttonText}>
            {saved ? 'Saved' : 'Save'}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleApply}
          style={[styles.actionButton, styles.applyButton]}
        >
          <Text style={styles.buttonText}>Apply Now</Text>
        </Pressable>
      </View>
      <Modal
        visible={saveSuccessVisible}
        title="Saved Job"
        message={`"${job.title}" was added to your saved jobs.`}
        confirmText="Nice"
        onConfirm={() => setSaveSuccessVisible(false)}
        onCancel={() => setSaveSuccessVisible(false)}
      />
      <Modal
        visible={removeSuccessVisible}
        title="Removed"
        message={`"${job.title}" was removed from saved jobs.`}
        confirmText="OK"
        onConfirm={() => setRemoveSuccessVisible(false)}
        onCancel={() => setRemoveSuccessVisible(false)}
      />
    </SafeAreaView>
  );
}

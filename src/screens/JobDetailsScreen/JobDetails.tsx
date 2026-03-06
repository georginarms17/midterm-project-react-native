import React, { useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { useTheme } from '../../context/ThemeContext';
import { buildScreenHeader } from '../../hooks/useScreenHeader';
import { useJobActions } from '../../hooks/useJobActions';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { formatSalary } from '../../utils/formatting';
import { parseDescriptionSections } from '../../utils/jobDescriptionParser';
import Modal from '../../components/Modal/Modal';
import { createStyles } from './JobDetails.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.JOB_DETAILS>;

export default function JobDetailsScreen({ route, navigation }: Props) {
  const { job } = route.params;
  const { colors, mode, toggleMode } = useTheme();
  const styles = useThemeStyles(createStyles);
  const { handleToggleSave, isSaved } = useJobActions({
    onSaveSuccess: () => setSaveSuccessVisible(true),
    onRemoveSuccess: () => setRemoveSuccessVisible(true),
  });
  const [saveSuccessVisible, setSaveSuccessVisible] = useState(false);
  const [removeSuccessVisible, setRemoveSuccessVisible] = useState(false);
  const saved = isSaved(job.id);

  useLayoutEffect(() => {
    const headerOptions = buildScreenHeader({
      title: 'Job Details',
      colors,
      headerLeft: () => (
        <Pressable hitSlop={12} onPress={() => navigation.goBack()}>
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

  const handleApply = () => {
    navigation.navigate(ROUTES.APPLICATION_FORM, { job, fromSaved: false });
  };
  const handleSave = () => handleToggleSave(job);

  const salary = formatSalary(job.salary, job.minSalary, job.maxSalary, job.currency);
  const displayLocation = job.locations && job.locations.length > 0
    ? job.locations.join(', ')
    : (job.location ?? 'Location not specified');
  const parsedDescription = parseDescriptionSections(job.description);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Logo and Title */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            {job.companyLogo ? (
              <Image source={{ uri: job.companyLogo }} style={styles.logo} resizeMode="contain" />
            ) : (
              <Icon name="briefcase" size={36} color={colors.mutedText} />
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
            <View style={styles.locationRow}>
              <Icon name="map-pin" size={14} color={colors.mutedText} />
              <Text style={styles.locationText}>{displayLocation}</Text>
            </View>
          </View>
        </View>

        {/*Job Details*/} 
        <View style={styles.section}>
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <View style={styles.gridContentRow}>
                <View style={styles.gridIconBadge}>
                  <Icon name="grid" size={22} color={colors.mutedText} style={styles.gridIcon} />
                </View>
                <View style={styles.gridTextBlock}>
                  <Text style={styles.gridLabel}>Category</Text>
                  <Text style={styles.gridValue}>{job.mainCategory ?? 'Not specified'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridContentRow}>
                <View style={styles.gridIconBadge}>
                  <Icon name="briefcase" size={22} color={colors.mutedText} style={styles.gridIcon} />
                </View>
                <View style={styles.gridTextBlock}>
                  <Text style={styles.gridLabel}>Job Type</Text>
                  <Text style={styles.gridValue}>{job.jobType ?? 'Not specified'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridContentRow}>
                <View style={styles.gridIconBadge}>
                  <Icon name="monitor" size={22} color={colors.mutedText} style={styles.gridIcon} />
                </View>
                <View style={styles.gridTextBlock}>
                  <Text style={styles.gridLabel}>Work Model</Text>
                  <Text style={styles.gridValue}>{job.workModel ?? 'Not specified'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridContentRow}>
                <View style={styles.gridIconBadge}>
                  <Icon name="user-check" size={22} color={colors.mutedText} style={styles.gridIcon} />
                </View>
                <View style={styles.gridTextBlock}>
                  <Text style={styles.gridLabel}>Seniority</Text>
                  <Text style={styles.gridValue}>{job.seniorityLevel ?? 'Not specified'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Salary */}
        <View style={styles.section}>
          <View style={styles.salaryCard}>
            <View style={styles.salaryRow}>
              <View style={styles.gridIconBadge}>
                <Icon name="dollar-sign" size={22} color={colors.mutedText} style={styles.gridIcon} />
              </View>
              <Text style={styles.salaryLabelRow}>Salary</Text>
              <Text style={styles.salaryValueRow}>{salary}</Text>
            </View>
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
        {parsedDescription.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.card}>
              <Text style={styles.descriptionText}>
                {parsedDescription.description}
              </Text>
            </View>
          </View>
        )}

        {/* Requirements */}
        {parsedDescription.requirements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.card}>
              <Text style={styles.descriptionText}>
                {parsedDescription.requirements}
              </Text>
            </View>
          </View>
        )}

        {/* Benefits */}
        {parsedDescription.benefits && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.card}>
              <Text style={styles.descriptionText}>
                {parsedDescription.benefits}
              </Text>
            </View>
          </View>
        )}

        {(job.pubDate || job.expiryDate) && (
          <View style={styles.section}>
            <View style={styles.dateGrid}>
              {job.pubDate && (
                <View style={styles.dateCard}>
                  <Text style={styles.dateLabel}>Posted</Text>
                  <Text style={styles.value}>
                    {new Date(job.pubDate * 1000).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {job.expiryDate && (
                <View style={styles.dateCard}>
                  <Text style={styles.dateLabel}>Expires</Text>
                  <Text style={styles.value}>
                    {new Date(job.expiryDate * 1000).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.actionsRowFixed}>
        <Pressable
          onPress={handleSave}
          style={[styles.actionButton, saved ? styles.saveButtonDisabled : styles.saveButton]}
        >
          <Text style={[styles.buttonText, saved && styles.buttonTextDisabled]}>
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
        confirmText="OK"
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

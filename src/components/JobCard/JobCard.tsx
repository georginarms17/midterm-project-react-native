import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Job } from '../../models/Job';
import { useTheme } from '../../context/ThemeContext';
import { useSavedJobs } from '../../context/SavedJobsContext';
import { createStyles } from './JobCard.styles';

export default function JobCard({
  job,
  onApply,
  showRemove,
  onRemove,
  onSaveSuccess,
}: {
  job: Job;
  onApply: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
  onSaveSuccess?: (job: Job) => void;
}) {
  const { colors } = useTheme();
  const { saveJob, isSaved } = useSavedJobs();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const saved = isSaved(job.id);
  const handleSave = () => {
    if (saved) return;
    saveJob(job);
    onSaveSuccess?.(job);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {job.title}
      </Text>
      <Text style={styles.subtitle}>
        {job.company}
        {job.location ? ` • ${job.location}` : ''}
      </Text>
      {job.salary ? (
        <Text style={styles.salary}>
          Salary: {job.salary}
        </Text>
      ) : null}

      <View style={styles.actionsRow}>
        {!showRemove ? (
          <Pressable
            onPress={handleSave}
            disabled={saved}
            style={[styles.actionButton, styles.saveButton, saved && styles.saveButtonDisabled]}
          >
            <Text style={styles.buttonText}>
              {saved ? 'Saved' : 'Save Job'}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={onRemove}
            style={[styles.actionButton, styles.removeButton]}
          >
            <Text style={styles.buttonText}>
              Remove Job
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={onApply}
          style={[styles.actionButton, styles.applyButton]}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}

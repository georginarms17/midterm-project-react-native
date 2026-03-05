import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Job } from '../../models/Job';
import { useJobActions } from '../../hooks/useJobActions';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { buildCompanyInfo } from '../../utils/formatting';
import { createStyles } from './JobCard.styles';
import { Feather as Icon } from '@expo/vector-icons';

export default function JobCard({
  job,
  onViewDetails,
  showRemove,
  onRemove,
  onSaveSuccess,
  onRemoveSuccess,
}: {
  job: Job;
  onViewDetails?: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
  onSaveSuccess?: (job: Job) => void;
  onRemoveSuccess?: (job: Job) => void;
}) {
  const styles = useThemeStyles(createStyles);
  const { handleToggleSave, isSaved } = useJobActions({ onSaveSuccess, onRemoveSuccess });

  const saved = isSaved(job.id);
  const companyInfo = buildCompanyInfo(job.company, job.location);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {job.companyLogo ? (
          <Image source={{ uri: job.companyLogo }} style={styles.logo} resizeMode="contain" />
        ) : null}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.subtitle}>{companyInfo}</Text>
        </View>
        <Pressable
          onPress={() => handleToggleSave(job)}
          style={[styles.saveTopButton, saved ? styles.saveButtonDisabled : styles.saveButton]}
        >
          <Icon name="bookmark" size={20} color={saved ? '#6a62be' : '#fff'} />
        </Pressable>
      </View>

      {job.salary ? (
        <Text style={styles.salary}>
          Salary: {job.salary}
        </Text>
      ) : null}

      <View style={styles.actionsRow}>
        {showRemove ? (
          <Pressable
            onPress={onRemove}
            style={[styles.actionButton, styles.removeButton]}
          >
            <Text style={styles.buttonText}>Remove Job</Text>
          </Pressable>
        ) : null}

        {onViewDetails && (
          <Pressable onPress={onViewDetails} style={[styles.actionButton, styles.detailButton]}>
            <Text style={styles.buttonText}>Details</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

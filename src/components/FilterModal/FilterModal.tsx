import React, { useMemo, useState } from 'react';
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Job } from '../../models/Job';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './FilterModal.styles';

export interface Filters {
  jobTypes: string[];
  workModels: string[];
  seniorityLevels: string[];
  mainCategories: string[];
}

type Props = {
  visible: boolean;
  jobs: Job[];
  onApply: (filters: Filters) => void;
  onClose: () => void;
};

export default function FilterModal({ visible, jobs, onApply, onClose }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [filters, setFilters] = useState<Filters>({
    jobTypes: [],
    workModels: [],
    seniorityLevels: [],
    mainCategories: [],
  });

  // Extract unique values from jobs
  const jobTypes = useMemo(() => {
    const types = new Set<string>();
    jobs.forEach((job) => {
      if (job.jobType) types.add(job.jobType);
    });
    return Array.from(types).sort();
  }, [jobs]);

  const workModels = useMemo(() => {
    const models = new Set<string>();
    jobs.forEach((job) => {
      if (job.workModel) models.add(job.workModel);
    });
    return Array.from(models).sort();
  }, [jobs]);

  const seniorityLevels = useMemo(() => {
    const levels = new Set<string>();
    jobs.forEach((job) => {
      if (job.seniorityLevel) levels.add(job.seniorityLevel);
    });
    return Array.from(levels).sort();
  }, [jobs]);

  const mainCategories = useMemo(() => {
    const categories = new Set<string>();
    jobs.forEach((job) => {
      if (job.mainCategory) categories.add(job.mainCategory);
    });
    return Array.from(categories).sort();
  }, [jobs]);

  const toggleFilter = (filterKey: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[filterKey] as string[];
      const isSelected = currentArray.includes(value);
      return {
        ...prev,
        [filterKey]: isSelected ? currentArray.filter((item) => item !== value) : [...currentArray, value],
      };
    });
  };

  const handleReset = () => {
    setFilters({
      jobTypes: [],
      workModels: [],
      seniorityLevels: [],
      mainCategories: [],
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const isFilterActive = (filterKey: keyof Filters, value: string) => {
    return (filters[filterKey] as string[]).includes(value);
  };

  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Icon name="x" size={20} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Job Type Filter */}
            {jobTypes.length > 0 && (
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Job Type</Text>
                <View style={styles.chipContainer}>
                  {jobTypes.map((type) => (
                    <Pressable
                      key={type}
                      style={[
                        styles.chip,
                        isFilterActive('jobTypes', type) && styles.chipActive,
                      ]}
                      onPress={() => toggleFilter('jobTypes', type)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isFilterActive('jobTypes', type) && styles.chipTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Work Model Filter */}
            {workModels.length > 0 && (
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Work Model</Text>
                <View style={styles.chipContainer}>
                  {workModels.map((model) => (
                    <Pressable
                      key={model}
                      style={[
                        styles.chip,
                        isFilterActive('workModels', model) && styles.chipActive,
                      ]}
                      onPress={() => toggleFilter('workModels', model)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isFilterActive('workModels', model) && styles.chipTextActive,
                        ]}
                      >
                        {model}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Seniority Level Filter */}
            {seniorityLevels.length > 0 && (
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Seniority Level</Text>
                <View style={styles.chipContainer}>
                  {seniorityLevels.map((level) => (
                    <Pressable
                      key={level}
                      style={[
                        styles.chip,
                        isFilterActive('seniorityLevels', level) && styles.chipActive,
                      ]}
                      onPress={() => toggleFilter('seniorityLevels', level)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isFilterActive('seniorityLevels', level) && styles.chipTextActive,
                        ]}
                      >
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Location filter removed per request */}

            {/* Main Category Filter */}
            {mainCategories.length > 0 && (
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Category</Text>
                <View style={styles.chipContainer}>
                  {mainCategories.map((category) => (
                    <Pressable
                      key={category}
                      style={[
                        styles.chip,
                        isFilterActive('mainCategories', category) && styles.chipActive,
                      ]}
                      onPress={() => toggleFilter('mainCategories', category)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isFilterActive('mainCategories', category) &&
                            styles.chipTextActive,
                        ]}
                      >
                        {category}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Tags filter removed per request */}

            {/* Salary Range removed per request */}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.clearButton]} onPress={handleReset}>
              <Text style={[styles.buttonText, styles.clearButtonText]}>Reset</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.applyButton]} onPress={handleApply}>
              <Text style={[styles.buttonText, styles.applyButtonText]}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

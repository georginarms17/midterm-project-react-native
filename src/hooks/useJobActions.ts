import { useCallback } from 'react';
import { useSavedJobs } from '../context/SavedJobsContext';
import { Job } from '../models/Job';

interface UseJobActionsOptions {
  onSaveSuccess?: (job: Job) => void;
  onRemoveSuccess?: (job: Job) => void;
}

/**
 * Custom hook to handle job save/remove logic
 * Reduces duplication in JobCard and JobDetails screens
 */
export function useJobActions(options?: UseJobActionsOptions) {
  const { saveJob, removeJob, isSaved } = useSavedJobs();
  const { onSaveSuccess, onRemoveSuccess } = options || {};

  const handleToggleSave = useCallback(
    (job: Job) => {
      const saved = isSaved(job.id);
      if (saved) {
        removeJob(job.id);
        onRemoveSuccess?.(job);
      } else {
        saveJob(job);
        onSaveSuccess?.(job);
      }
    },
    [saveJob, removeJob, isSaved, onRemoveSuccess, onSaveSuccess]
  );

  return { handleToggleSave, isSaved };
}

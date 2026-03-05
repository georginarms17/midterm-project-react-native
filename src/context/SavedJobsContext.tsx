import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Job } from '../models/Job';

type SavedJobsContextValue = {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const SavedJobsContext = createContext<SavedJobsContextValue | null>(null);

export const SavedJobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = useCallback((job: Job) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev; // prevent duplicates
      return [...prev, job];
    });
  }, []);

  const removeJob = useCallback((id: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const isSaved = useCallback((id: string) => savedJobs.some((j) => j.id === id), [savedJobs]);

  const value = useMemo(
    () => ({ savedJobs, saveJob, removeJob, isSaved }),
    [savedJobs, saveJob, removeJob, isSaved]
  );

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
};

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used inside SavedJobsProvider');
  return ctx;
}

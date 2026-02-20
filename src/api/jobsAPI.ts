import { API_BASE_URL } from '../constants/api';
import { Job } from '../models/Job';
import { transformJobs } from '../utils/jobTransform';

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${API_BASE_URL}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs (${res.status})`);
  }

  const data = await res.json();

  const rawJobs: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.jobs)
    ? data.jobs
    : Array.isArray(data?.data)
    ? data.data
    : [];

  return transformJobs(rawJobs);
}

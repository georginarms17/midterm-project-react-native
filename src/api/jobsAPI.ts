import { API_BASE_URL } from '../constants/api';
import { Job } from '../models/Job';
import { transformJobs } from '../utils/jobTransform';

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs (${res.status})`);
  }

  const data: unknown = await res.json();
  const rawJobs = extractRawJobs(data);

  return transformJobs(rawJobs);
}

function extractRawJobs(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;

  if (data && typeof data === 'object') {
    const payload = data as { jobs?: unknown; data?: unknown };
    if (Array.isArray(payload.jobs)) return payload.jobs;
    if (Array.isArray(payload.data)) return payload.data;
  }

  return [];
}

import uuid from 'react-native-uuid';
import { Job } from '../models/Job';

function formatSalary(item: any): string | undefined {
  const min = typeof item.minSalary === 'number' ? item.minSalary : null;
  const max = typeof item.maxSalary === 'number' ? item.maxSalary : null;
  const currency = typeof item.currency === 'string' ? item.currency : '';

  if (min === null && max === null) return undefined;
  if (min !== null && max !== null) return `${currency} ${min} - ${max}`.trim();
  if (min !== null) return `${currency} ${min}+`.trim();
  return `${currency} up to ${max}`.trim();
}

export function transformJobs(raw: any[]): Job[] {
  return raw.map((item) => {
    const title =
      item.title || item.position || item.job_title || 'Untitled Job';
    const company =
      item.companyName ||
      item.company ||
      item.company_name ||
      item.employer ||
      'Unknown Company';
    const location = Array.isArray(item.locations)
      ? item.locations.filter(Boolean).join(', ')
      : item.location;
    const url = item.applicationLink || item.guid || item.url;
    const salary = formatSalary(item) || item.salary;

    return {
      id: String(item.guid || item.applicationLink || uuid.v4()),
      title: String(title),
      company: String(company),
      location: location ? String(location) : undefined,
      salary: salary ? String(salary) : undefined,
      description: item.description ? String(item.description) : undefined,
      url: url ? String(url) : undefined,
    };
  });
}

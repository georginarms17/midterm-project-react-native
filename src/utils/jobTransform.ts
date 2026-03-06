import uuid from 'react-native-uuid';
import { Job } from '../models/Job';

type RawJob = Record<string, unknown>;

function formatSalary(item: RawJob): string | undefined {
  const min = toNumber(item.minSalary);
  const max = toNumber(item.maxSalary);
  const currency = toStringOrUndefined(item.currency) ?? '';

  if (min === null && max === null) return undefined;
  if (min !== null && max !== null) return `${currency} ${min} - ${max}`.trim();
  if (min !== null) return `${currency} ${min}+`.trim();
  return `${currency} up to ${max}`.trim();
}

export function transformJobs(raw: unknown[]): Job[] {
  return raw.map((entry) => {
    const item: RawJob = entry && typeof entry === 'object' ? (entry as RawJob) : {};

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

    const tags = toStringArray(item.tags);
    const locationsArray = toStringArray(item.locations);

    return {
      id: String(item.guid || item.applicationLink || uuid.v4()),
      title: String(title),
      company: String(company),
      location: location ? String(location) : undefined,
      salary: salary ? String(salary) : undefined,
      description: item.description ? String(item.description) : undefined,
      url: url ? String(url) : undefined,
      mainCategory: toStringOrUndefined(item.mainCategory ?? item.category),
      companyLogo: toStringOrUndefined(item.companyLogo ?? item.logo),
      jobType: toStringOrUndefined(item.jobType),
      workModel: toStringOrUndefined(item.workModel),
      seniorityLevel: toStringOrUndefined(item.seniorityLevel),
      minSalary: toNumber(item.minSalary),
      maxSalary: toNumber(item.maxSalary),
      currency: toStringOrUndefined(item.currency),
      locations: locationsArray,
      tags,
      pubDate: toNumber(item.pubDate) ?? undefined,
      expiryDate: toNumber(item.expiryDate) ?? undefined,
      applicationLink: toStringOrUndefined(item.applicationLink),
      guid: toStringOrUndefined(item.guid),
    };
  });
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter(Boolean)
      .map((entry) => String(entry));
  }

  if (value) return [String(value)];

  return [];
}

function toStringOrUndefined(value: unknown): string | undefined {
  if (value == null) return undefined;
  return String(value);
}

function toNumber(value: unknown): number | null {
  return typeof value === 'number' ? value : null;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location?: string;
    salary?: string;
    description?: string;
    url?: string;
    // Extended fields from API
    mainCategory?: string;
    companyLogo?: string;
    jobType?: string;
    workModel?: string;
    seniorityLevel?: string;
    minSalary?: number | null;
    maxSalary?: number | null;
    currency?: string;
    locations?: string[];
    tags?: string[];
    pubDate?: number;
    expiryDate?: number;
    applicationLink?: string;
    guid?: string;
}
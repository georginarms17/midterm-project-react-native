// Format salary with fallback values.
export function formatSalary(
  salary: string | undefined,
  minSalary: number | null | undefined,
  maxSalary: number | null | undefined,
  currency: string = 'EUR'
): string {
  if (salary) return salary;
  if (minSalary != null && maxSalary != null) return `${minSalary} - ${maxSalary} ${currency}`;
  if (minSalary != null) return `${minSalary} ${currency}`;
  if (maxSalary != null) return `${maxSalary} ${currency}`;
  return 'Not specified';
}

// Strip HTML tags from text.
export function stripHtmlTags(html: string): string {
  if (!html) return '';

  // Convert common block tags to newlines, list items to bullets, then strip remaining tags.
  let s = html.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/p>/gi, '\n');
  s = s.replace(/<li>/gi, '\n• ');
  s = s.replace(/<\/li>/gi, '\n');
  s = s.replace(/<[^>]*>/g, '');

  s = decodeHtmlEntities(s);
  s = s.replace(/\n{2,}/g, '\n\n');

  return s.trim();
}

// Build company info string with location.
export function buildCompanyInfo(company: string, location?: string): string {
  return location ? `${company} - ${location}` : company;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

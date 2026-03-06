import { stripHtmlTags } from './formatting';

export type DescriptionParts = {
  description: string;
  requirements: string;
  benefits: string;
};

export function parseDescriptionSections(raw?: string): DescriptionParts {
  if (!raw) {
    return { description: '', requirements: '', benefits: '' };
  }

  const hasStructuredHtml = /<h[1-6][^>]*>[\s\S]*<\/h[1-6]>/i.test(raw) && /<li[^>]*>[\s\S]*<\/li>/i.test(raw);
  if (hasStructuredHtml) {
    const htmlParts = parseHtmlSections(raw);
    if (htmlParts.description || htmlParts.requirements || htmlParts.benefits) {
      return htmlParts;
    }
  }

  const normalized = stripHtmlTags(raw)
    .replace(/\r/g, '')
    .replace(/[\u2022\u25CF\u25AA\u25E6]/g, '\n• ')
    .replace(/\s*((job\s+)?requirements?|qualifications?|benefits?|perks?)\s*:/gi, '\n$1:\n');

  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const description: string[] = [];
  const requirements: string[] = [];
  const benefits: string[] = [];
  let current: keyof DescriptionParts = 'description';

  for (const line of lines) {
    const requirementMatch = line.match(/^((job\s+)?requirements?|qualifications?)\s*:?\s*(.*)$/i);
    if (requirementMatch) {
      current = 'requirements';
      if (requirementMatch[3]) {
        requirements.push(requirementMatch[3]);
      }
      continue;
    }

    const benefitsMatch = line.match(/^(benefits?|perks?)\s*:?\s*(.*)$/i);
    if (benefitsMatch) {
      current = 'benefits';
      if (benefitsMatch[2]) {
        benefits.push(benefitsMatch[2]);
      }
      continue;
    }

    if (current === 'requirements') {
      requirements.push(line);
    } else if (current === 'benefits') {
      benefits.push(line);
    } else {
      description.push(line);
    }
  }

  return {
    description: description.join('\n').trim(),
    requirements: requirements.join('\n').trim(),
    benefits: benefits.join('\n').trim(),
  };
}

function parseHtmlSections(html: string): DescriptionParts {
  const result: DescriptionParts = {
    description: '',
    requirements: '',
    benefits: '',
  };

  const sectionRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>([\s\S]*?)(?=<h[1-6][^>]*>|$)/gi;
  let match: RegExpExecArray | null;

  while ((match = sectionRegex.exec(html)) !== null) {
    const heading = stripHtmlTags(match[1] ?? '').toLowerCase();
    const content = match[2] ?? '';
    const parsedContent = extractHtmlListText(content);

    if (!parsedContent) continue;

    if (/(^|\b)description(\b|$)/i.test(heading)) {
      result.description = parsedContent;
      continue;
    }

    if (/(^|\b)(requirements?|qualifications?)(\b|$)/i.test(heading)) {
      result.requirements = parsedContent;
      continue;
    }

    if (/(^|\b)(benefits?|perks?)(\b|$)/i.test(heading)) {
      result.benefits = parsedContent;
    }
  }

  return result;
}

function extractHtmlListText(content: string): string {
  const listItems = [...content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((item) => stripHtmlTags(item[1] ?? '').trim())
    .filter(Boolean)
    .map((item) => `• ${item}`);

  if (listItems.length > 0) {
    return listItems.join('\n');
  }

  return stripHtmlTags(content).trim();
}

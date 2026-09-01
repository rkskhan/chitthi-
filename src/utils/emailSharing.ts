import { LetterData } from '../types';
import { getShareableRecipientUrl } from './urlSharing';

export type EmailLetterFormat = 'full' | 'invitation' | 'text-only';

/**
 * Formats letter data into cleanly structured Bengali text for email body.
 */
export function formatBengaliLetterForEmail(
  data: LetterData,
  format: EmailLetterFormat = 'full',
  customNote?: string
): string {
  const shareUrl = getShareableRecipientUrl(data);
  const title = [data.titleWord1, data.titleWord2, data.titleWord3].filter(Boolean).join(' ');

  if (format === 'invitation') {
    return [
      `প্রিয় ${data.receiverName || 'সুহৃদ'},`,
      '',
      customNote || 'আপনার জন্য একটি বিশেষ চিঠি পাঠানো হয়েছে। খাম খুলে অ্যানিমেটেড চিঠিটি পড়তে নিচের লিংকে ক্লিক করুন:',
      '',
      `💌 অ্যানিমেটেড চিঠি দেখতে ক্লিক করুন:`,
      shareUrl,
      '',
      `প্রেরক: ${data.senderName || data.signatureName || 'আপনার শুভাকাঙ্ক্ষী'}`,
      `তারিখ: ${data.letterDate || ''}`
    ].filter(line => line !== undefined).join('\n');
  }

  const parts: string[] = [];

  // Masthead & Metadata
  if (title) {
    parts.push(`【 ${title} 】`);
    if (data.subtitle) {
      parts.push(`"${data.subtitle}"`);
    }
    parts.push('');
  }

  if (data.letterDate) {
    parts.push(`তারিখ: ${data.letterDate}`);
  }

  if (data.senderName) {
    const fromAddr = data.senderAddress ? ` (${data.senderAddress})` : '';
    parts.push(`প্রেরক: ${data.senderName}${fromAddr}`);
  }

  if (data.receiverName) {
    const toAddr = data.receiverAddress ? ` (${data.receiverAddress})` : '';
    parts.push(`প্রাপক: ${data.receiverName}${toAddr}`);
  }

  parts.push('--------------------------------------------------');
  parts.push('');

  // Salutation
  if (data.salutation) {
    parts.push(data.salutation);
    parts.push('');
  }

  // Paragraphs
  const paragraphs = data.paragraphs.filter(p => p && p.trim().length > 0);
  if (paragraphs.length > 0) {
    paragraphs.forEach(p => {
      parts.push(p.trim());
      parts.push('');
    });
  }

  // Signoff & Signature
  if (data.signOff) {
    parts.push(data.signOff);
  }
  if (data.signatureName) {
    parts.push(data.signatureName);
  }

  parts.push('');
  parts.push('--------------------------------------------------');

  // Interactive link attachment
  if (format === 'full') {
    parts.push('');
    parts.push('💌 বিশেষ অ্যানিমেটেড খাম ও ইন্টারেক্টিভ চিঠি দেখতে এই লিংকে প্রবেশ করুন:');
    parts.push(shareUrl);
  }

  return parts.join('\n');
}

/**
 * Builds standard mailto URL with URI-encoded subject and body
 */
export function buildMailtoUrl(to: string, subject: string, body: string): string {
  const cleanTo = to.trim();
  const encodedSubject = encodeURIComponent(subject.trim());
  const encodedBody = encodeURIComponent(body);

  return `mailto:${cleanTo}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Builds Google Mail Web Compose URL for seamless web browser users
 */
export function buildGmailWebComposeUrl(to: string, subject: string, body: string): string {
  const cleanTo = encodeURIComponent(to.trim());
  const cleanSubject = encodeURIComponent(subject.trim());
  const cleanBody = encodeURIComponent(body);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${cleanTo}&su=${cleanSubject}&body=${cleanBody}`;
}

/**
 * Builds Outlook Web Compose URL
 */
export function buildOutlookWebComposeUrl(to: string, subject: string, body: string): string {
  const cleanTo = encodeURIComponent(to.trim());
  const cleanSubject = encodeURIComponent(subject.trim());
  const cleanBody = encodeURIComponent(body);

  return `https://outlook.live.com/mail/0/deeplink/compose?to=${cleanTo}&subject=${cleanSubject}&body=${cleanBody}`;
}

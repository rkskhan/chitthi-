import { LetterData } from '../types';
import { DEFAULT_LETTER } from './templates';

// Encode letter data into base64url string
export function encodeLetterData(data: LetterData): string {
  try {
    const jsonStr = JSON.stringify(data);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    utf8Bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error('Failed to encode letter data', e);
    return '';
  }
}

// Decode letter data from base64url string
export function decodeLetterData(encoded: string): LetterData | null {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return { ...DEFAULT_LETTER, ...JSON.parse(jsonStr) };
  } catch (e) {
    console.error('Failed to decode letter data', e);
    return null;
  }
}

export function getShareableRecipientUrl(data: LetterData): string {
  const origin = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const encoded = encodeLetterData(data);
  return `${origin}?mode=friend&d=${encoded}`;
}

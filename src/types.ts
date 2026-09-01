export interface LetterData {
  // Masthead & Title
  titleWord1: string; // e.g., "চিঠি"
  titleWord2: string; // e.g., "দিবসের"
  titleWord3: string; // e.g., "শুভেচ্ছা"
  subtitle: string;   // e.g., "প্রতিটি না-বলা কথার জন্য একটি দিন"
  
  // Letter Content
  salutation: string; // e.g., "আমার প্রাণের অর্ধাঙ্গিনী,"
  paragraphs: string[];
  signOff: string;    // e.g., "ইতি তোমার,"
  signatureName: string; // e.g., "সাগর"
  letterDate: string; // e.g., "০১ সেপ্টেম্বর, ২০২৬"

  // Addresses
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;

  // Customization & Aesthetics
  theme: 'classic' | 'romantic' | 'vintage' | 'royal' | 'midnight';
  stampType: 'star' | 'rose' | 'dove' | 'heart' | 'postmark';
  sealType: 'envelope-heart' | 'heart' | 'rose' | 'crown' | 'feather' | 'star' | 'lotus' | 'initial' | 'tree' | 'crescent';
  sealColor: 'crimson' | 'gold' | 'emerald' | 'midnight' | 'copper' | 'rose-gold';
  paperStyle: 'parchment' | 'kraft' | 'antique' | 'pure';
  fontFamily: 'hind' | 'tiro' | 'serif' | 'noto-serif' | 'galada' | 'anek' | 'baloo' | 'atma' | 'mina' | 'noto-sans' | 'kalpurush' | 'siyam' | 'vintage-book';
  enableAudio: boolean;
}

export type WaxSealType = LetterData['sealType'];
export type WaxSealColor = LetterData['sealColor'];

export type ViewMode = 'editor' | 'preview-split' | 'friend-view';

export interface ThemeConfig {
  id: LetterData['theme'];
  name: string;
  nameBn: string;
  cream: string;
  paper: string;
  ink: string;
  accentRed: string;
  accentGold: string;
  accentNavy: string;
  stripeRed: string;
  stripeNavy: string;
  borderPattern?: string;
}

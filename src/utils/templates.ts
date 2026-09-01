import { LetterData, ThemeConfig } from '../types';

export const BLANK_LETTER: LetterData = {
  titleWord1: 'আমার',
  titleWord2: 'হৃদয়ের',
  titleWord3: 'চিঠি',
  subtitle: 'একান্তে লেখা একটি চিঠি',
  salutation: 'প্রিয়,',
  paragraphs: [''],
  signOff: 'ইতি,',
  signatureName: '',
  letterDate: '০১ সেপ্টেম্বর, ২০২৬',
  senderName: '',
  senderAddress: '',
  receiverName: '',
  receiverAddress: '',
  theme: 'classic',
  stampType: 'star',
  sealType: 'envelope-heart',
  sealColor: 'crimson',
  paperStyle: 'parchment',
  fontFamily: 'hind',
  enableAudio: true,
};

export const DEFAULT_LETTER: LetterData = {
  titleWord1: 'চিঠি',
  titleWord2: 'দিবসের',
  titleWord3: 'শুভেচ্ছা',
  subtitle: 'প্রতিটি না-বলা কথার জন্য একটি দিন',
  salutation: 'নাম,',
  paragraphs: [
    ],
  signOff: 'ইতি তোমার,',
  signatureName: 'সাগর',
  letterDate: '০১ সেপ্টেম্বর, ২০২৬',
  senderName: 'রেজাউল করিম সাগর',
  senderAddress: 'মেট্রো হাউজিং, বসিলা, মোহাম্মদপুর, ঢাকা-১২০৭',
  receiverName: 'নাম',
  receiverAddress: 'ঠিকানা ',
  theme: 'classic',
  stampType: 'star',
  sealType: 'envelope-heart',
  sealColor: 'crimson',
  paperStyle: 'parchment',
  fontFamily: 'hind',
  enableAudio: true,
};

export interface WaxSealInfo {
  id: LetterData['sealType'];
  nameBn: string;
  nameEn: string;
  icon: string;
  descBn: string;
}

export interface WaxColorInfo {
  id: LetterData['sealColor'];
  nameBn: string;
  nameEn: string;
  bgGradient: string;
  rimColor: string;
  shadowColor: string;
  textColor: string;
}

export const WAX_SEALS: WaxSealInfo[] = [
  { id: 'envelope-heart', nameBn: 'চিঠি ও হৃদয়', nameEn: 'Love Letter', icon: '💌', descBn: 'ভালোবাসার বার্তা ও চিঠি' },
  { id: 'heart', nameBn: 'অনন্ত প্রেম', nameEn: 'Sacred Heart', icon: '❤️', descBn: 'হৃদয়ের গভীর অনুভূতি' },
  { id: 'rose', nameBn: 'গোলাপ মোহর', nameEn: 'Vintage Rose', icon: '🌹', descBn: 'স্নিগ্ধ ভালোবাসার প্রতীক' },
  { id: 'crown', nameBn: 'রাজকীয় মুকুট', nameEn: 'Royal Crown', icon: '👑', descBn: 'মর্যাদাপূর্ণ রাজকীয় সীল' },
  { id: 'feather', nameBn: 'ময়ূরপঙ্খী পালক', nameEn: 'Quill Feather', icon: '🪶', descBn: 'চিঠির কলম ও সাহিত্যিক ভাব' },
  { id: 'lotus', nameBn: 'নীলপদ্ম / পদ্ম', nameEn: 'Sacred Lotus', icon: '🪷', descBn: 'পবিত্রতা ও সৌন্দর্যের প্রতীক' },
  { id: 'star', nameBn: 'ধ্রুবতারা', nameEn: 'North Star', icon: '⭐', descBn: 'উজ্জ্বল আশার আলো' },
  { id: 'tree', nameBn: 'স্মৃতির বৃক্ষ', nameEn: 'Tree of Life', icon: '🌳', descBn: 'চিরন্তন বন্ধন ও স্মৃতি' },
  { id: 'crescent', nameBn: 'চাঁদ ও তারা', nameEn: 'Moon & Star', icon: '🌙', descBn: 'স্নিগ্ধ রাতের রূপকথা' },
  { id: 'initial', nameBn: 'নামের আদ্যক্ষর', nameEn: 'Custom Initial', icon: 'চি', descBn: 'প্রেরক বা চিঠির নিজস্ব আদ্যক্ষর' },
];

export const WAX_COLORS: WaxColorInfo[] = [
  { 
    id: 'crimson', 
    nameBn: 'রক্তিম লাল', 
    nameEn: 'Vintage Crimson', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 55%, #7f1d1d 100%)',
    rimColor: '#fca5a5',
    shadowColor: 'rgba(127, 29, 29, 0.5)',
    textColor: '#ffffff'
  },
  { 
    id: 'gold', 
    nameBn: 'রাজকীয় স্বর্ণ', 
    nameEn: 'Antique Gold', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #fbbf24 0%, #d97706 55%, #78350f 100%)',
    rimColor: '#fde68a',
    shadowColor: 'rgba(180, 83, 9, 0.5)',
    textColor: '#ffffff'
  },
  { 
    id: 'emerald', 
    nameBn: 'পান্না সবুজ', 
    nameEn: 'Emerald Green', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #34d399 0%, #059669 55%, #064e3b 100%)',
    rimColor: '#a7f3d0',
    shadowColor: 'rgba(6, 78, 59, 0.5)',
    textColor: '#ffffff'
  },
  { 
    id: 'midnight', 
    nameBn: 'গাঢ় নীল', 
    nameEn: 'Midnight Navy', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #60a5fa 0%, #2563eb 55%, #1e3a8a 100%)',
    rimColor: '#bfdbfe',
    shadowColor: 'rgba(30, 58, 138, 0.5)',
    textColor: '#ffffff'
  },
  { 
    id: 'copper', 
    nameBn: 'তামাটে ব্রোঞ্জ', 
    nameEn: 'Metallic Bronze', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #fb923c 0%, #c2410c 55%, #7c2d12 100%)',
    rimColor: '#fed7aa',
    shadowColor: 'rgba(124, 45, 18, 0.5)',
    textColor: '#ffffff'
  },
  { 
    id: 'rose-gold', 
    nameBn: 'রোজ গোল্ড', 
    nameEn: 'Rose Gold', 
    bgGradient: 'radial-gradient(circle at 35% 35%, #f472b6 0%, #db2777 55%, #831843 100%)',
    rimColor: '#fbcfe8',
    shadowColor: 'rgba(131, 24, 67, 0.5)',
    textColor: '#ffffff'
  },
];

export interface BengaliFontInfo {
  id: LetterData['fontFamily'];
  nameBn: string;
  nameEn: string;
  categoryBn: string;
  sampleText: string;
  cssClass: string;
  cssFamily: string;
  descBn: string;
}

export const BENGALI_FONTS: BengaliFontInfo[] = [
  {
    id: 'hind',
    nameBn: 'হিন্দ শিলিগুড়ি',
    nameEn: 'Hind Siliguri',
    categoryBn: 'আধুনিক সান-সেরিফ',
    sampleText: 'আমার প্রাণের অর্ধাঙ্গিনী',
    cssClass: 'font-hind',
    cssFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
    descBn: 'সবচেয়ে জনপ্রিয়, সহজে পাঠযোগ্য ও পরিচ্ছন্ন আধুনিক ফন্ট।'
  },
  {
    id: 'tiro',
    nameBn: 'টিরো বাংলা',
    nameEn: 'Tiro Bangla',
    categoryBn: 'সাহিত্যিক ও ক্লাসিক',
    sampleText: 'প্রতিটি না-বলা কথার চিঠি',
    cssClass: 'font-tiro',
    cssFamily: '"Tiro Bangla", "Noto Serif Bengali", serif',
    descBn: 'বই প্রকাশনা ও মার্জিত চিঠি লেখার ঐতিহ্যবাহী সাহিত্যিক ফন্ট।'
  },
  {
    id: 'noto-serif',
    nameBn: 'নোটো সেরিফ বাংলা',
    nameEn: 'Noto Serif Bengali',
    categoryBn: 'ঐতিহ্যবাহী সেরিফ',
    sampleText: 'চিরন্তন ভালোবাসার দলিল',
    cssClass: 'font-serif-bengali',
    cssFamily: '"Noto Serif Bengali", "SolaimanLipi", serif',
    descBn: 'স্পষ্ট সেরিফ স্ট্রোকযুক্ত রাজকীয় ও মর্যাদাশীল ফন্ট।'
  },
  {
    id: 'galada',
    nameBn: 'গালাদা ক্যালিগ্রাফি',
    nameEn: 'Galada Calligraphy',
    categoryBn: 'হস্তশিল্প ও ক্যালিগ্রাফি',
    sampleText: 'হৃদয়ের গভীর আবেগ ও প্রেম',
    cssClass: 'font-galada',
    cssFamily: '"Galada", "Noto Serif Bengali", cursive, serif',
    descBn: 'বক্র ক্যালিগ্রাফি ও প্রেমপত্রের জন্য এক অসাধারণ শৈল্পিক রূপ।'
  },
  {
    id: 'anek',
    nameBn: 'অনেক বাংলা',
    nameEn: 'Anek Bangla',
    categoryBn: 'সমসাময়িক স্টাইলিশ',
    sampleText: 'স্মৃতির সোনালী বিকেলগুলো',
    cssClass: 'font-anek',
    cssFamily: '"Anek Bangla", "Hind Siliguri", sans-serif',
    descBn: 'সুষম, তীক্ষ্ণ জ্যামিতিক রেখা ও ফ্যাশনেবল ডিজাইন।'
  },
  {
    id: 'baloo',
    nameBn: 'বালু দা ২',
    nameEn: 'Baloo Da 2',
    categoryBn: 'মিষ্টি ও বন্ধুত্বপূর্ণ',
    sampleText: 'খামভর্তি উষ্ণ ভালোবাসা',
    cssClass: 'font-baloo',
    cssFamily: '"Baloo Da 2", "Hind Siliguri", cursive, sans-serif',
    descBn: 'নরম, গোলগাল ও অমায়িক আন্তরিক অনুভূতির প্রকাশ।'
  },
  {
    id: 'atma',
    nameBn: 'আত্মা হস্তলিপি',
    nameEn: 'Atma Handlettering',
    categoryBn: 'জীবন্ত হাতের লেখা',
    sampleText: 'চিঠির পাতায় অনুভূতির রঙ',
    cssClass: 'font-atma',
    cssFamily: '"Atma", "Galada", cursive, sans-serif',
    descBn: 'হাতের লেখার স্বাভাবিক মাধুর্য, ব্যক্তিগত চিঠি ও ডায়েরির মেজাজ।'
  },
  {
    id: 'mina',
    nameBn: 'মীনা বাংলা',
    nameEn: 'Mina Light',
    categoryBn: 'স্লিম ও সুচারু',
    sampleText: 'দূরত্ব বাড়ে, টান কমে না',
    cssClass: 'font-mina',
    cssFamily: '"Mina", "Hind Siliguri", sans-serif',
    descBn: 'চিকন, পরিশীলিত ও অনন্য রেখার আধুনিক বাংলা ফন্ট।'
  },
  {
    id: 'noto-sans',
    nameBn: 'নোটো সান্স বাংলা',
    nameEn: 'Noto Sans Bengali',
    categoryBn: 'স্পষ্ট সার্বজনীন',
    sampleText: 'চিঠি দিবসের আন্তরিক শুভেচ্ছা',
    cssClass: 'font-noto-sans',
    cssFamily: '"Noto Sans Bengali", sans-serif',
    descBn: 'সুস্পষ্ট, প্রাতিষ্ঠানিক ও সব ডিভাইসে অনায়াসে পাঠযোগ্য।'
  },
  {
    id: 'kalpurush',
    nameBn: 'কালপুরুষ / সোলাইমান লিপি',
    nameEn: 'Kalpurush & SolaimanLipi',
    categoryBn: 'মুদ্রিত ক্লাসিক প্রেস',
    sampleText: 'আজ হঠাৎ পুরনো ডায়েরিটা মনে পড়ল',
    cssClass: 'font-kalpurush',
    cssFamily: '"SolaimanLipi", "Kalpurush", "Siyam Rupali", "Noto Serif Bengali", serif',
    descBn: 'বাংলা সংবাদপত্র ও বইয়ের চিরপরিচিত ক্লাসিক টাইপোগ্রাফি।'
  },
  {
    id: 'siyam',
    nameBn: 'সিয়াম রূপালী',
    nameEn: 'Siyam Rupali',
    categoryBn: 'সংহত ও আঁটসাঁট',
    sampleText: 'একান্তে বলা কিছু না-বলা কথা',
    cssClass: 'font-siyam',
    cssFamily: '"Siyam Rupali", "AdorshoLipi", "Hind Siliguri", sans-serif',
    descBn: 'সংহত ও আঁটসাঁট অক্ষরের নিখুঁত স্পষ্টতা।'
  },
  {
    id: 'vintage-book',
    nameBn: 'প্রাচীন পুঁথি ও সাহিত্য',
    nameEn: 'Vintage Manuscript',
    categoryBn: 'প্রাচীন ঐতিহ্য',
    sampleText: 'ইতি তোমার চিরন্তন সাগর',
    cssClass: 'font-vintage-book',
    cssFamily: '"Tiro Bangla", "Noto Serif Bengali", "SolaimanLipi", Georgia, serif',
    descBn: 'প্রাচীন পান্ডুলিপি ও ধ্রুপদী মহাকাব্যের আবেদন।'
  },
];

export const TEMPLATES: { id: string; name: string; description: string; data: Partial<LetterData> }[] = [
  {
    id: 'original-chithi',
    name: 'চিঠি দিবসের চিঠি (মূল)',
    description: 'প্রেম ও অভিমানের আবেগঘন স্মৃতিপত্র',
    data: DEFAULT_LETTER
  },
  {
    id: 'friendship',
    name: 'প্রিয় বন্ধুকে চিঠি',
    description: 'ছোটবেলার বন্ধুত্ব ও অমলিন স্মৃতির চিঠি',
    data: {
      titleWord1: 'বন্ধুত্বের',
      titleWord2: 'অমলিন',
      titleWord3: 'চিঠি',
      subtitle: 'দূরত্ব বাড়ে, কিন্তু আত্মার টান কখনো কমে না',
      salutation: 'প্রিয় বন্ধু,',
      paragraphs: [
        'কেমন আছিস রে? কতদিন হয়ে গেল আমাদের সেই চায়ের আড্ডা আর প্রাণখোলা হাসাহাসি নেই। যান্ত্রিক জীবনের ভিড়ে আমরা সবাই কেমন যেন ব্যস্ত হয়ে পড়েছি।',
        'আজ হঠাৎ পুরনো ডায়েরিটা ঘাঁটতে গিয়ে তোকে খুব মনে পড়ল। সেই স্কুল পালানো বিকেল, একসঙ্গে বৃষ্টিভেজা আর ভবিষ্যতের কতশত স্বপ্নের কথা আজও আমার স্মৃতিতে উজ্জ্বল।',
        'দূরত্ব যতই বাড়ুক না কেন, আমাদের বন্ধুত্ব সবসময় আগের মতোই নিখাদ থাকবে। সময় পেলে একদিন চলে আয়, আবার জমিয়ে আড্ডা দেব।'
      ],
      signOff: 'তোর চিরকালের বন্ধু,',
      signatureName: 'আবির',
      letterDate: '০১ সেপ্টেম্বর, ২০২৬',
      theme: 'royal',
      stampType: 'postmark',
      paperStyle: 'antique'
    }
  },
  {
    id: 'love-letter',
    name: 'ভালোবাসার চিঠি',
    description: 'হৃদয়ের গভীরতম অনুভূতির প্রকাশ',
    data: {
      titleWord1: 'হৃদয়ের',
      titleWord2: 'গোপন',
      titleWord3: 'অনুভূতি',
      subtitle: 'শব্দে শব্দে লেখা আমার ভালোবাসার প্রতিচ্ছবি',
      salutation: 'প্রিয়তমা,',
      paragraphs: [
        'তোমাকে প্রথম দেখার সেই মুহূর্তটি আজও আমার হৃদয়ে জীবন্ত। তোমার চোখের ওই স্নিগ্ধ চাহনি আর মিষ্টি হাসিতে আমি বারবার নিজেকে হারিয়ে ফেলি।',
        'জীবনের প্রতিটি বাঁকে তোমার হাত ধরে হেঁটে যাওয়ার চেয়ে সুন্দর আর কোনো স্বপ্ন আমার নেই। তুমি আমার জীবনে আসা এক পরম উপহার।',
        'সবসময় এভাবেই আমার পাশে থেকো। আমার ভালোবাসা তোমার জন্য চিরন্তন ও অসীম।'
      ],
      signOff: 'অনন্ত ভালোবাসাসহ,',
      signatureName: 'তোমারই',
      letterDate: '০১ সেপ্টেম্বর, ২০২৬',
      theme: 'romantic',
      stampType: 'rose',
      paperStyle: 'parchment'
    }
  },
  {
    id: 'parents-gratitude',
    name: 'শ্রদ্ধেয় বাবা-মায়ের প্রতি',
    description: 'কৃতজ্ঞতা ও শ্রদ্ধার নির্মল চিঠি',
    data: {
      titleWord1: 'শ্রদ্ধাঞ্জলি',
      titleWord2: 'ও',
      titleWord3: 'ভালোবাসা',
      subtitle: 'বাবা-মায়ের অপরিসীম ত্যাগের প্রতি কৃতজ্ঞতা',
      salutation: 'শ্রদ্ধেয় বাবা ও মা,',
      paragraphs: [
        'আমার শতকোটি সালাম ও প্রণাম গ্রহণ করবেন। আপনারা আমার জীবনের সবচেয়ে বড় শক্তি ও অনুপ্রেরণা।',
        'নিজেদের সুখ-আহ্লাদ বিসর্জন দিয়ে আপনারা যেভাবে আমাকে বড় করেছেন, তার ঋণ আমি কোনোদিন শোধ করতে পারব না। আপনাদের দোয়া ও আশীর্বাদই আমাকে প্রতিটি পদক্ষেপে এগিয়ে নিয়ে যায়।',
        'আল্লাহর কাছে সবসময় আপনাদের সুস্বাস্থ্য ও দীর্ঘায়ু প্রার্থনা করি। নিজেদের যত্ন নেবেন।'
      ],
      signOff: 'আপনাদের স্নেহের সন্তান,',
      signatureName: 'শুভ',
      letterDate: '০১ সেপ্টেম্বর, ২০২৬',
      theme: 'vintage',
      stampType: 'dove',
      paperStyle: 'kraft'
    }
  }
];

export const THEMES: Record<LetterData['theme'], ThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'Classic Airmail',
    nameBn: 'ঐতিহ্যবাহী এয়ারমেইল',
    cream: '#F3EEE0',
    paper: '#FBF8EF',
    ink: '#2A2723',
    accentRed: '#DC3B26',
    accentGold: '#C6952F',
    accentNavy: '#2F5C82',
    stripeRed: '#C23B30',
    stripeNavy: '#2F5C82'
  },
  romantic: {
    id: 'romantic',
    name: 'Romantic Crimson',
    nameBn: 'গোলাপী রোমান্টিক',
    cream: '#F7EBEB',
    paper: '#FFF7F7',
    ink: '#3D2128',
    accentRed: '#BE185D',
    accentGold: '#D97706',
    accentNavy: '#9D174D',
    stripeRed: '#E11D48',
    stripeNavy: '#F43F5E'
  },
  vintage: {
    id: 'vintage',
    name: 'Vintage Sepia',
    nameBn: 'ভিন্টেজ সেপিয়া',
    cream: '#EFE7D3',
    paper: '#FAF3E0',
    ink: '#382B1C',
    accentRed: '#9C4221',
    accentGold: '#B48425',
    accentNavy: '#5C4A3A',
    stripeRed: '#9C4221',
    stripeNavy: '#6E553F'
  },
  royal: {
    id: 'royal',
    name: 'Royal Post',
    nameBn: 'রাজকীয় নীল ডাক',
    cream: '#E9EEF5',
    paper: '#F4F7FB',
    ink: '#1E293B',
    accentRed: '#2563EB',
    accentGold: '#D97706',
    accentNavy: '#1E40AF',
    stripeRed: '#DC2626',
    stripeNavy: '#1D4ED8'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Gold',
    nameBn: 'মিডনাইট গোল্ড',
    cream: '#1E222A',
    paper: '#282D37',
    ink: '#EDE8DF',
    accentRed: '#E5A93B',
    accentGold: '#F3C969',
    accentNavy: '#93C5FD',
    stripeRed: '#E5A93B',
    stripeNavy: '#3B82F6'
  }
};

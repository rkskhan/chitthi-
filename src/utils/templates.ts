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
  paperStyle: 'parchment',
  fontFamily: 'hind',
  enableAudio: true,
};

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

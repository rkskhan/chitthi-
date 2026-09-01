import React, { useState, useEffect } from 'react';
import { LetterData } from '../types';
import { THEMES, BENGALI_FONTS } from '../utils/templates';
import { sounds } from '../utils/soundEffects';
import { WaxSeal } from './WaxSeal';
import { 
  Mail, 
  RotateCcw, 
  Copy, 
  Printer, 
  Volume2, 
  VolumeX, 
  Check, 
  Eye, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface Props {
  data: LetterData;
  isCreatorPreview?: boolean;
  onExitPreview?: () => void;
}

type AnimationStage = 'closed' | 'flap-opening' | 'letter-rising' | 'opened' | 'closing';

export const RecipientLetterView: React.FC<Props> = ({
  data,
  isCreatorPreview = false,
  onExitPreview,
}) => {
  const [animStage, setAnimStage] = useState<AnimationStage>('closed');
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(data.enableAudio);

  const theme = THEMES[data.theme] || THEMES.classic;

  const handleOpenEnvelope = () => {
    if (animStage !== 'closed') return;
    
    if (soundEnabled) {
      sounds.playPaperRustle();
    }

    // Step 1: Flap unseals and flips open (0ms - 400ms)
    setAnimStage('flap-opening');

    // Step 2: Letter slides up out of envelope pocket (380ms - 900ms)
    const timer1 = setTimeout(() => {
      setAnimStage('letter-rising');
    }, 380);

    // Step 3: Complete opening and show full letter sheet (920ms)
    const timer2 = setTimeout(() => {
      setAnimStage('opened');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleCloseEnvelope = () => {
    if (soundEnabled) {
      sounds.playGentleChime();
    }
    setAnimStage('closing');
    
    setTimeout(() => {
      setAnimStage('closed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleCopy = () => {
    const fullText = `${data.salutation}\n\n${data.paragraphs.join('\n\n')}\n\n${data.signOff}\n${data.signatureName}\n\nপ্রেরক: ${data.senderName}\nপ্রাপক: ${data.receiverName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontInfo = BENGALI_FONTS.find(f => f.id === data.fontFamily) || (data.fontFamily === 'serif' ? BENGALI_FONTS.find(f => f.id === 'noto-serif') : null) || BENGALI_FONTS[0];
  const fontClass = fontInfo.cssClass;

  const renderStamp = (className = "w-14 h-14") => {
    const color = theme.accentRed;
    switch (data.stampType) {
      case 'rose':
        return (
          <svg className={className} viewBox="0 0 60 60">
            <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="30" cy="28" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
            <path d="M30 18 C26 22, 23 26, 30 34 C37 26, 34 22, 30 18 Z M24 26 C28 28, 32 28, 36 26 M30 34 L30 45 M26 39 Q30 37 34 39" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'dove':
        return (
          <svg className={className} viewBox="0 0 60 60">
            <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <path d="M20 34 C24 28, 32 24, 42 22 C38 28, 36 34, 38 40 C32 38, 26 38, 20 34 Z M28 28 C28 20, 36 16, 40 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={className} viewBox="0 0 60 60">
            <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M30 42 C16 30 18 18 26 18 C30 18 30 22 30 22 C30 22 30 18 34 18 C42 18 44 30 30 42 Z" fill={color} opacity="0.85" />
          </svg>
        );
      case 'postmark':
        return (
          <svg className={className} viewBox="0 0 60 60">
            <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="30" cy="30" r="19" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" />
            <path d="M12 30 L48 30 M15 24 L45 24 M15 36 L45 36" stroke={color} strokeWidth="1" opacity="0.6" />
            <text x="30" y="34" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill={color} textAnchor="middle">POST</text>
          </svg>
        );
      case 'star':
      default:
        return (
          <svg className={className} viewBox="0 0 60 60">
            <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M30 12 L36 24 L48 24 L38 32 L42 44 L30 36 L18 44 L22 32 L12 24 L24 24 Z" fill={color} opacity="0.85" />
          </svg>
        );
    }
  };

  const isFlapOpen = animStage === 'flap-opening' || animStage === 'letter-rising' || animStage === 'opened';
  const isLetterRising = animStage === 'letter-rising';
  const isFullyOpen = animStage === 'opened';

  return (
    <div 
      className="min-h-screen transition-colors duration-500 relative flex flex-col items-center justify-start p-4 sm:p-6"
      style={{
        backgroundColor: theme.cream,
        color: theme.ink,
        backgroundImage: `radial-gradient(circle at 15% 10%, rgba(198,149,47,0.08), transparent 45%), radial-gradient(circle at 85% 90%, rgba(220,59,38,0.07), transparent 45%)`
      }}
    >
      {/* Top Banner if in Creator Preview Mode */}
      {isCreatorPreview && (
        <div 
          id="creator-preview-bar"
          className="sticky top-3 z-50 mb-4 w-full max-w-2xl bg-neutral-900/90 backdrop-blur-md text-amber-50 px-4 py-2.5 rounded-full shadow-xl flex items-center justify-between text-xs sm:text-sm border border-neutral-700/50 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center gap-2 font-medium">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>বন্ধু দর্শন প্রিভিউ মোড (বন্ধুরা শুধুমাত্র এই ২য় অংশটি দেখবে)</span>
          </div>
          {onExitPreview && (
            <button
              id="exit-preview-btn"
              onClick={onExitPreview}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>সম্পাদনায় ফিরুন</span>
            </button>
          )}
        </div>
      )}

      {/* Floating Sound Toggle */}
      <div className="fixed top-4 right-4 z-40">
        <button
          id="sound-toggle-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          aria-label={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
          className="p-2.5 rounded-full bg-white/70 backdrop-blur-md hover:bg-white/90 text-neutral-700 shadow-md border border-neutral-300/60 transition-all cursor-pointer"
          title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE 3D ENVELOPE STAGE (With Authentic Multi-Layer Opening)      */}
      {/* ========================================================================= */}
      {!isFullyOpen && (
        <div className={`w-full min-h-[85vh] flex flex-col items-center justify-center transition-all duration-500 ${
          animStage === 'closing' ? 'animate-in fade-in' : ''
        }`}>
          
          {/* 3D Envelope Wrapper */}
          <div className="w-full max-w-lg mb-6 relative select-none" style={{ perspective: '1400px' }}>
            
            <div
              id="recipient-envelope"
              role="button"
              tabIndex={0}
              onClick={handleOpenEnvelope}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenEnvelope()}
              className={`group relative w-full aspect-[16/10] rounded-xl shadow-2xl overflow-visible cursor-pointer transition-all duration-500 ${
                animStage === 'closed' ? 'hover:-translate-y-1.5 hover:shadow-[0_32px_65px_rgba(0,0,0,0.25)] active:scale-[0.99]' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d'
              }}
              aria-label="চিঠি খুলতে ট্যাপ বা ক্লিক করুন"
            >
              {/* Envelope Base / Back Liner (Inner Cavity) */}
              <div 
                className="absolute inset-0 rounded-xl overflow-hidden shadow-inner border border-neutral-300/50"
                style={{ 
                  background: `linear-gradient(175deg, #dfd3ba 0%, #cfc1a5 100%)` 
                }}
              >
                {/* Vintage inner watermark pattern */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.accentRed} 1px, transparent 1px)`,
                    backgroundSize: '16px 16px'
                  }}
                />
              </div>

              {/* SLIDING LETTER SHEET (Physically tucked inside cavity, slides up on open) */}
              <div
                className={`absolute left-3 right-3 sm:left-4 sm:right-4 h-[92%] rounded-lg bg-white shadow-md border border-neutral-200/80 p-4 sm:p-5 flex flex-col justify-between transition-all duration-700 ease-out z-10 ${
                  isLetterRising 
                    ? '-translate-y-[62%] sm:-translate-y-[70%] scale-[1.03] shadow-[0_20px_40px_rgba(0,0,0,0.22)]' 
                    : isFlapOpen 
                    ? '-translate-y-4 scale-[0.99]' 
                    : 'top-2 translate-y-0 scale-[0.96] opacity-90'
                }`}
                style={{ 
                  backgroundColor: theme.paper,
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Mini folded letter header preview */}
                <div className="border-b border-neutral-200 pb-2 flex items-center justify-between text-[10px] sm:text-xs text-neutral-500">
                  <span className="font-semibold text-amber-900">{data.letterDate || '০১ সেপ্টেম্বর'}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: theme.accentRed }}>
                    একান্তে একটি চিঠি
                  </span>
                </div>

                <div className="py-2 text-center">
                  <div className="font-extrabold text-sm sm:text-base text-neutral-800 line-clamp-1">
                    <span style={{ color: theme.accentRed }}>{data.titleWord1}</span>{' '}
                    <span>{data.titleWord2}</span>{' '}
                    <span style={{ color: theme.accentGold }}>{data.titleWord3}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-neutral-700 mt-1 line-clamp-1">
                    {data.salutation}
                  </div>
                  <div className="text-[10px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed italic px-2">
                    {data.paragraphs[0] ? `"${data.paragraphs[0].slice(0, 75)}..."` : 'চিঠির মূল কথা পড়তে ক্লিক করুন...'}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-neutral-600 border-t border-neutral-200 pt-1.5">
                  <span>ইতি, <strong style={{ color: theme.accentRed }}>{data.signatureName}</strong></span>
                  <span className="text-amber-700 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    খুলছে...
                  </span>
                </div>
              </div>

              {/* ENVELOPE FRONT POCKET & SIDE FOLDS (Sits in front of letter) */}
              <div 
                className="absolute inset-0 rounded-xl overflow-hidden z-20 pointer-events-none"
                style={{ backgroundColor: 'transparent' }}
              >
                {/* Airmail Vintage Border */}
                <div 
                  className="absolute inset-0"
                  style={{
                    border: '10px solid transparent',
                    background: `repeating-linear-gradient(45deg, ${theme.stripeRed} 0 14px, ${theme.paper} 14px 22px, ${theme.stripeNavy} 22px 36px, ${theme.paper} 36px 44px) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                {/* Bottom & Side Pocket Paper Structure */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: theme.paper,
                    clipPath: 'polygon(0 30%, 50% 68%, 100% 30%, 100% 100%, 0 100%)',
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.06)'
                  }}
                />

                {/* Postal Stamp */}
                <div className="absolute top-4 right-4 z-30 filter drop-shadow-sm pointer-events-none">
                  {renderStamp("w-13 h-13")}
                </div>

                {/* Front Envelope Details (From & To) */}
                <div className="absolute inset-0 flex items-end p-5 sm:p-7 z-30 pointer-events-none">
                  <div className="flex gap-4 sm:gap-6 w-full text-xs sm:text-sm leading-relaxed">
                    <div className="flex-1 min-w-0">
                      <div 
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: theme.accentRed }}
                      >
                        প্রেরক (From)
                      </div>
                      <div className="font-semibold truncate text-neutral-800">{data.senderName}</div>
                      {data.senderAddress && (
                        <div className="text-[11px] sm:text-xs text-neutral-600 truncate mt-0.5">{data.senderAddress}</div>
                      )}
                    </div>

                    <div className="w-[1px] bg-neutral-300/80 my-1 shrink-0" />

                    <div className="flex-1 min-w-0">
                      <div 
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: theme.accentRed }}
                      >
                        প্রাপক (To)
                      </div>
                      <div className="font-semibold truncate text-neutral-800">{data.receiverName}</div>
                      {data.receiverAddress && (
                        <div className="text-[11px] sm:text-xs text-neutral-600 truncate mt-0.5">{data.receiverAddress}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP FLAP (3D Hinged Triangle with Wax Seal) */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[54%] origin-top transition-transform duration-700 ease-in-out z-30 ${
                  isFlapOpen ? '-rotate-x-180 z-0' : 'rotate-x-0'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1200px'
                }}
              >
                {/* Triangular Flap Body */}
                <div 
                  className="w-full h-full relative"
                  style={{
                    background: `linear-gradient(165deg, #F5EEDB 0%, ${theme.paper} 100%)`,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    boxShadow: isFlapOpen ? 'none' : '0 8px 16px rgba(0,0,0,0.12)'
                  }}
                >
                  {/* Flap subtle edge border */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      borderBottom: '1px solid rgba(0,0,0,0.12)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                    }}
                  />

                  {/* Customizable Wax Seal on Flap */}
                  <div 
                    className={`absolute bottom-0 sm:bottom-0.5 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isFlapOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100 group-hover:scale-110'
                    }`}
                  >
                    <WaxSeal 
                      type={data.sealType || 'envelope-heart'}
                      color={data.sealColor || 'crimson'}
                      initialText={data.signatureName || data.senderName || 'চি'}
                      size="lg"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Click to open badge & Instructions */}
          <div className="flex flex-col items-center gap-2">
            <button
              id="envelope-open-hint"
              onClick={handleOpenEnvelope}
              disabled={animStage !== 'closed'}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95 select-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: theme.ink,
                border: `1.5px solid ${theme.accentRed}50`
              }}
            >
              <Mail className={`w-5 h-5 ${animStage === 'closed' ? 'text-red-600 animate-bounce' : 'text-neutral-400'}`} />
              <span>{animStage === 'closed' ? 'চিঠিটি খুলতে খামে ট্যাপ করুন' : 'চিঠি খোলা হচ্ছে...'}</span>
            </button>
            <p className="text-xs text-neutral-500 font-medium">
              খাম খুলে ভিতরের চিঠিটি সুন্দর অ্যানিমেশনে দেখার জন্য ট্যাপ করুন
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. OPENED LETTER SHEET VIEW (Blossoms into full handwritten layout)       */}
      {/* ========================================================================= */}
      {isFullyOpen && (
        <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-700 my-6">
          <div 
            id="letter-paper-sheet"
            className={`rounded-xl shadow-2xl p-6 sm:p-10 md:p-14 relative border border-neutral-200/60 transition-all ${fontClass}`}
            style={{ 
              backgroundColor: theme.paper,
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2), 0 0 1px 1px rgba(0,0,0,0.05)'
            }}
          >
            {/* Letter Date */}
            {data.letterDate && (
              <div className="text-right text-xs sm:text-sm font-medium mb-4 text-neutral-500 animate-in fade-in duration-500">
                {data.letterDate}
              </div>
            )}

            {/* Masthead Lockup */}
            <header className="text-center pb-6 sm:pb-8 mb-8 border-b border-neutral-200/80 animate-in fade-in slide-in-from-top-3 duration-700">
              <div className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-normal">
                <span style={{ color: theme.accentRed }}>{data.titleWord1}</span>{' '}
                <span style={{ color: theme.ink }}>{data.titleWord2}</span>{' '}
                <span className="block text-[0.68em] mt-1 font-bold" style={{ color: theme.accentGold }}>
                  {data.titleWord3}
                </span>
              </div>
              {data.subtitle && (
                <div className="mt-3 text-xs sm:text-sm text-neutral-600 font-medium">
                  {data.subtitle}
                </div>
              )}
            </header>

            {/* Letter Body */}
            <main className="space-y-5 text-base sm:text-[17px] leading-[2.1] text-neutral-800">
              {data.salutation && (
                <div className="font-bold text-lg sm:text-xl text-neutral-900 mb-4 animate-in fade-in duration-500">
                  {data.salutation}
                </div>
              )}

              {data.paragraphs.map((para, idx) => (
                <p 
                  key={idx} 
                  className="text-justify leading-relaxed whitespace-pre-line animate-in fade-in duration-700"
                  style={{ animationDelay: `${(idx + 1) * 120}ms` }}
                >
                  {para}
                </p>
              ))}

              {/* Signature block */}
              <div className="pt-6 text-right space-y-1 animate-in fade-in duration-700">
                <div className="text-sm sm:text-base text-neutral-700">{data.signOff}</div>
                <div 
                  className="text-2xl sm:text-3xl font-bold font-serif"
                  style={{ color: theme.accentRed }}
                >
                  {data.signatureName}
                </div>
              </div>
            </main>

            {/* Bottom Postal Card */}
            <section className="mt-10 pt-8 border-t border-dashed border-neutral-300/80 animate-in fade-in duration-700">
              <div 
                className="relative rounded-lg p-4 sm:p-6 shadow-sm overflow-hidden"
                style={{ background: `linear-gradient(160deg, #EFE7D2, ${theme.paper})` }}
              >
                {/* Mini stripe border */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: '5px solid transparent',
                    background: `repeating-linear-gradient(45deg, ${theme.stripeRed} 0 10px, ${theme.paper} 10px 16px, ${theme.stripeNavy} 16px 26px, ${theme.paper} 26px 32px) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                <div className="absolute top-3 right-3">
                  {renderStamp("w-10 h-10")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="pr-2">
                    <div className="font-bold text-[11px] uppercase tracking-wider mb-1" style={{ color: theme.accentRed }}>
                      প্রেরক (Sender)
                    </div>
                    <div className="font-semibold text-neutral-800">{data.senderName}</div>
                    {data.senderAddress && (
                      <div className="text-neutral-600 text-xs mt-0.5 whitespace-pre-line">{data.senderAddress}</div>
                    )}
                  </div>

                  <div className="sm:border-l sm:border-neutral-300 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                    <div className="font-bold text-[11px] uppercase tracking-wider mb-1" style={{ color: theme.accentRed }}>
                      প্রাপক (Receiver)
                    </div>
                    <div className="font-semibold text-neutral-800">{data.receiverName}</div>
                    {data.receiverAddress && (
                      <div className="text-neutral-600 text-xs mt-0.5 whitespace-pre-line">{data.receiverAddress}</div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Recipient Action Toolbar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-neutral-200/60 print:hidden">
              <button
                id="refold-envelope-btn"
                onClick={handleCloseEnvelope}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 bg-white/70 hover:bg-white hover:border-red-400 hover:text-red-600 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>পুনরায় খামে রাখুন</span>
              </button>

              <button
                id="copy-letter-text-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 bg-white/70 hover:bg-white hover:border-neutral-500 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি সম্পন্ন!' : 'চিঠি কপি করুন'}</span>
              </button>

              <button
                id="print-letter-btn"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 bg-white/70 hover:bg-white hover:border-neutral-500 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>মুদ্রণ / PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

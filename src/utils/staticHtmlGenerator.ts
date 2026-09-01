import { LetterData } from '../types';
import { THEMES } from './templates';

export function generateStampSvg(type: LetterData['stampType'], color: string): string {
  switch (type) {
    case 'rose':
      return `
        <svg class="stamp" viewBox="0 0 60 60">
          <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2"/>
          <circle cx="30" cy="28" r="14" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
          <path d="M30 18 C26 22, 23 26, 30 34 C37 26, 34 22, 30 18 Z M24 26 C28 28, 32 28, 36 26 M30 34 L30 45 M26 39 Q30 37 34 39" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
    case 'dove':
      return `
        <svg class="stamp" viewBox="0 0 60 60">
          <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2"/>
          <circle cx="30" cy="30" r="18" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
          <path d="M20 34 C24 28, 32 24, 42 22 C38 28, 36 34, 38 40 C32 38, 26 38, 20 34 Z M28 28 C28 20, 36 16, 40 18" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
    case 'heart':
      return `
        <svg class="stamp" viewBox="0 0 60 60">
          <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2"/>
          <path d="M30 42 C16 30 18 18 26 18 C30 18 30 22 30 22 C30 22 30 18 34 18 C42 18 44 30 30 42 Z" fill="${color}" opacity="0.85"/>
        </svg>`;
    case 'postmark':
      return `
        <svg class="stamp" viewBox="0 0 60 60">
          <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2"/>
          <circle cx="30" cy="30" r="19" fill="none" stroke="${color}" stroke-width="1.5"/>
          <circle cx="30" cy="30" r="14" fill="none" stroke="${color}" stroke-width="0.75" stroke-dasharray="2 2"/>
          <path d="M12 30 L48 30 M15 24 L45 24 M15 36 L45 36" stroke="${color}" stroke-width="1" opacity="0.6"/>
          <text x="30" y="34" font-size="8" font-family="sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">POST</text>
        </svg>`;
    case 'star':
    default:
      return `
        <svg class="stamp" viewBox="0 0 60 60">
          <rect x="1" y="1" width="58" height="58" rx="2" fill="#FBF8EF" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 2"/>
          <path d="M30 12 L36 24 L48 24 L38 32 L42 44 L30 36 L18 44 L22 32 L12 24 L24 24 Z" fill="${color}" opacity="0.85"/>
        </svg>`;
  }
}

export function generateWaxSealSvg(
  type: LetterData['sealType'] = 'envelope-heart',
  color: LetterData['sealColor'] = 'crimson',
  initial: string = 'চি'
): string {
  const colorMap: Record<string, { bg: string; rim: string; shadow: string }> = {
    crimson: { 
      bg: 'radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 55%, #7f1d1d 100%)', 
      rim: '#fca5a5', 
      shadow: 'rgba(127, 29, 29, 0.5)' 
    },
    gold: { 
      bg: 'radial-gradient(circle at 35% 35%, #fbbf24 0%, #d97706 55%, #78350f 100%)', 
      rim: '#fde68a', 
      shadow: 'rgba(180, 83, 9, 0.5)' 
    },
    emerald: { 
      bg: 'radial-gradient(circle at 35% 35%, #34d399 0%, #059669 55%, #064e3b 100%)', 
      rim: '#a7f3d0', 
      shadow: 'rgba(6, 78, 59, 0.5)' 
    },
    midnight: { 
      bg: 'radial-gradient(circle at 35% 35%, #60a5fa 0%, #2563eb 55%, #1e3a8a 100%)', 
      rim: '#bfdbfe', 
      shadow: 'rgba(30, 58, 138, 0.5)' 
    },
    copper: { 
      bg: 'radial-gradient(circle at 35% 35%, #fb923c 0%, #c2410c 55%, #7c2d12 100%)', 
      rim: '#fed7aa', 
      shadow: 'rgba(124, 45, 18, 0.5)' 
    },
    'rose-gold': { 
      bg: 'radial-gradient(circle at 35% 35%, #f472b6 0%, #db2777 55%, #831843 100%)', 
      rim: '#fbcfe8', 
      shadow: 'rgba(131, 24, 67, 0.5)' 
    },
  };

  const col = colorMap[color] || colorMap.crimson;

  let emblem = '💌';
  if (type === 'heart') {
    emblem = '<svg style="width:16px;height:16px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  } else if (type === 'rose') {
    emblem = '<svg style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;" viewBox="0 0 24 24"><path d="M12 3a4 4 0 0 0-4 4c0 3 4 5 4 8 0-3 4-5 4-8a4 4 0 0 0-4-4z" fill="currentColor" fill-opacity="0.4"/><path d="M12 15v6"/><path d="M9 18c1.5-1 3-1 3-1s1.5 0 3 1"/></svg>';
  } else if (type === 'crown') {
    emblem = '<svg style="width:16px;height:16px;fill:currentColor;" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3H5v-1h14v1z"/></svg>';
  } else if (type === 'feather') {
    emblem = '<svg style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 12.5V21h8.5z" fill="currentColor" fill-opacity="0.3"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>';
  } else if (type === 'lotus') {
    emblem = '<svg style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.8;" viewBox="0 0 24 24"><path d="M12 3c-2 4-2 7 0 11 2-4 2-7 0-11z" fill="currentColor" fill-opacity="0.4"/><path d="M12 14c-3-2-6-2-8 1 3 3 7 3 8-1z"/><path d="M12 14c3-2 6-2 8 1-3 3-7 3-8-1z"/></svg>';
  } else if (type === 'star') {
    emblem = '<svg style="width:16px;height:16px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12 2l2.4 6.9 7.6.3-5.8 4.7 2 7.1-6.2-4.2-6.2 4.2 2-7.1-5.8-4.7 7.6-.3z"/></svg>';
  } else if (type === 'tree') {
    emblem = '<svg style="width:16px;height:16px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12 2a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.1V19H7v2h10v-2h-2v-5.9c1.8-1 3-2.9 3-5.1a6 6 0 0 0-6-6z"/></svg>';
  } else if (type === 'crescent') {
    emblem = '<svg style="width:16px;height:16px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
  } else if (type === 'initial') {
    const char = (initial ? initial.trim().charAt(0) : 'চি') || 'চি';
    emblem = `<span style="font-family:'Noto Serif Bengali',serif; font-weight:800; font-size:14px;">${escapeHtml(char)}</span>`;
  }

  return `
    <div class="wax-seal" style="background: ${col.bg}; border-color: ${col.rim}; box-shadow: 0 4px 12px ${col.shadow}, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.4);">
      <div class="wax-seal-inner">
        ${emblem}
      </div>
    </div>
  `;
}

export function generateStaticRecipientHtml(data: LetterData): string {
  const theme = THEMES[data.theme] || THEMES.classic;
  const stampSvg = generateStampSvg(data.stampType, theme.accentRed);
  const stampMiniSvg = stampSvg.replace('class="stamp"', 'class="stamp-mini"');
  const waxSealHtml = generateWaxSealSvg(
    data.sealType || 'envelope-heart',
    data.sealColor || 'crimson',
    data.signatureName || data.senderName || 'চি'
  );

  const paragraphHtml = data.paragraphs
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n          ');

  const senderHtml = escapeHtml(data.senderName) + (data.senderAddress ? `<br><span class="addr-sub">${escapeHtml(data.senderAddress).replace(/\n/g, '<br>')}</span>` : '');
  const receiverHtml = escapeHtml(data.receiverName) + (data.receiverAddress ? `<br><span class="addr-sub">${escapeHtml(data.receiverAddress).replace(/\n/g, '<br>')}</span>` : '');

  const fontInfoMap: Record<string, string> = {
    'hind': 'font-hind',
    'tiro': 'font-tiro',
    'serif': 'font-serif-bengali',
    'noto-serif': 'font-serif-bengali',
    'galada': 'font-galada',
    'anek': 'font-anek',
    'baloo': 'font-baloo',
    'atma': 'font-atma',
    'mina': 'font-mina',
    'noto-sans': 'font-noto-sans',
    'kalpurush': 'font-kalpurush',
    'siyam': 'font-siyam',
    'vintage-book': 'font-vintage-book',
  };

  const fontClass = fontInfoMap[data.fontFamily] || 'font-hind';

  return `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.titleWord1)} ${escapeHtml(data.titleWord2)} ${escapeHtml(data.titleWord3)} — আপনার জন্য একটি চিঠি</title>
<meta name="description" content="${escapeHtml(data.subtitle)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@300;400;500;600;700;800&family=Atma:wght@400;500;600;700&family=Baloo+Da+2:wght@400;500;600;700;800&family=Galada&family=Hind+Siliguri:wght@300;400;500;600;700&family=Mina:wght@400;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700;800&family=Noto+Serif+Bengali:wght@400;600;700;800&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">
<style>
  :root {
    --cream: ${theme.cream};
    --paper: ${theme.paper};
    --ink: ${theme.ink};
    --red: ${theme.accentRed};
    --gold: ${theme.accentGold};
    --navy: ${theme.accentNavy};
    --stripe-red: ${theme.stripeRed};
    --stripe-navy: ${theme.stripeNavy};
    --line: rgba(42, 39, 35, 0.16);
    --shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
    --envelope-shadow: 0 24px 55px rgba(0, 0, 0, 0.22);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    background: var(--cream);
    color: var(--ink);
    font-family: "Hind Siliguri", "Noto Sans Bengali", "Kalpurush", "SolaimanLipi", sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .font-hind { font-family: "Hind Siliguri", "Noto Sans Bengali", sans-serif; }
  .font-tiro { font-family: "Tiro Bangla", "Noto Serif Bengali", serif; }
  .font-serif-bengali, .font-noto-serif { font-family: "Noto Serif Bengali", "SolaimanLipi", "Kalpurush", serif; }
  .font-galada { font-family: "Galada", "Noto Serif Bengali", cursive, serif; }
  .font-anek { font-family: "Anek Bangla", "Hind Siliguri", sans-serif; }
  .font-baloo { font-family: "Baloo Da 2", "Hind Siliguri", cursive, sans-serif; }
  .font-atma { font-family: "Atma", "Galada", cursive, sans-serif; }
  .font-mina { font-family: "Mina", "Hind Siliguri", sans-serif; }
  .font-noto-sans { font-family: "Noto Sans Bengali", sans-serif; }
  .font-kalpurush { font-family: "SolaimanLipi", "Kalpurush", "Siyam Rupali", "Noto Serif Bengali", serif; }
  .font-siyam { font-family: "Siyam Rupali", "AdorshoLipi", "Hind Siliguri", sans-serif; }
  .font-vintage-book { font-family: "Tiro Bangla", "Noto Serif Bengali", "SolaimanLipi", Georgia, serif; }

  body {
    background-image:
      radial-gradient(circle at 15% 10%, rgba(198, 149, 47, 0.09), transparent 45%),
      radial-gradient(circle at 85% 90%, rgba(220, 59, 38, 0.08), transparent 45%);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ---------- Envelope Stage ---------- */
  #stage {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  #stage.hidden {
    display: none;
  }

  .envelope-wrap {
    width: 100%;
    max-width: 500px;
    perspective: 1400px;
    margin-bottom: 20px;
  }

  .envelope {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: linear-gradient(175deg, #dfd3ba 0%, #cfc1a5 100%);
    border-radius: 12px;
    box-shadow: var(--envelope-shadow);
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
    user-select: none;
    transform-style: preserve-3d;
  }

  .envelope:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 32px 70px rgba(0, 0, 0, 0.28);
  }

  .envelope:active {
    transform: translateY(-1px) scale(0.99);
  }

  .sliding-letter {
    position: absolute;
    top: 8px;
    left: 14px;
    right: 14px;
    height: 90%;
    background: var(--paper);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.06);
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    transform-origin: bottom center;
    transition: transform 0.65s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.4s ease, box-shadow 0.65s ease;
  }

  .envelope.open .sliding-letter {
    transform: translateY(-68%) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.22);
    z-index: 5;
  }

  .stripe-border {
    position: absolute;
    inset: 0;
    border: 10px solid transparent;
    background:
      repeating-linear-gradient(45deg, var(--stripe-red) 0 14px, var(--paper) 14px 22px, var(--stripe-navy) 22px 36px, var(--paper) 36px 44px) border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    z-index: 3;
    border-radius: 12px;
  }

  .front-pocket {
    position: absolute;
    inset: 0;
    background: var(--paper);
    clip-path: polygon(0 30%, 50% 68%, 100% 30%, 100% 100%, 0 100%);
    z-index: 2;
    border-radius: 12px;
  }

  .flap-wrap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 54%;
    transform-origin: top center;
    transition: transform 0.7s cubic-bezier(0.6, -0.1, 0.2, 1.15);
    z-index: 4;
    transform-style: preserve-3d;
  }

  .envelope.open .flap-wrap {
    transform: rotateX(180deg);
    z-index: 0;
  }

  .flap {
    width: 100%;
    height: 100%;
    background: linear-gradient(165deg, #F5EEDB, var(--paper));
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    border-bottom: 1px solid var(--line);
    position: relative;
  }

  .wax-seal {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: opacity 0.3s ease, transform 0.3s ease;
    user-select: none;
  }

  .wax-seal-inner {
    width: 78%;
    height: 78%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
    font-size: 16px;
  }

  .envelope.open .wax-seal {
    opacity: 0;
    transform: translateX(-50%) scale(0.7);
  }

  .stamp {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 54px;
    height: 54px;
    z-index: 3;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }

  .envelope-body {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 22px 28px;
  }

  .addr-grid {
    display: flex;
    gap: 20px;
    width: 100%;
    font-size: 13.5px;
    line-height: 1.45;
    z-index: 2;
  }

  .addr-grid .label {
    font-size: 11px;
    color: var(--red);
    font-weight: 700;
    margin-bottom: 3px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .addr-grid .divider {
    width: 1px;
    background: var(--line);
    margin: 2px 0;
  }

  .addr-sub {
    font-size: 11.5px;
    opacity: 0.8;
  }

  .open-hint-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 18px;
    padding: 10px 20px;
    background: rgba(42, 39, 35, 0.06);
    backdrop-filter: blur(8px);
    border: 1px solid var(--line);
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    animation: gentle-pulse 2.4s ease-in-out infinite;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .open-hint-badge:hover {
    background: rgba(42, 39, 35, 0.12);
    transform: translateY(-1px);
  }

  @keyframes gentle-pulse {
    0%, 100% { opacity: 0.85; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.03); }
  }

  /* ---------- Letter Page ---------- */
  #letterPage {
    display: none;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
    padding: 36px 16px 80px;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  #letterPage.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

  .sheet {
    background: var(--paper);
    border-radius: 6px;
    box-shadow: var(--shadow);
    padding: 44px clamp(20px, 6vw, 60px);
    position: relative;
    border: 1px solid rgba(0,0,0,0.04);
  }

  .date-badge {
    text-align: right;
    font-size: 13px;
    color: var(--ink);
    opacity: 0.6;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .masthead {
    text-align: center;
    padding-bottom: 28px;
    margin-bottom: 34px;
    border-bottom: 1px solid var(--line);
  }

  .masthead .lockup {
    font-weight: 800;
    font-size: clamp(34px, 7vw, 52px);
    line-height: 1.15;
    letter-spacing: 0.01em;
  }

  .masthead .lockup .w1 { color: var(--red); }
  .masthead .lockup .w2 { color: var(--ink); }
  .masthead .lockup .w3 {
    display: block;
    color: var(--gold);
    font-size: 0.68em;
    margin-top: 6px;
    font-weight: 700;
  }

  .masthead .tag {
    margin-top: 14px;
    font-size: 14.5px;
    color: var(--ink);
    opacity: 0.7;
  }

  .salutation {
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .letter-body {
    font-size: 16.5px;
    line-height: 2.1;
    color: var(--ink);
  }

  .letter-body p {
    margin: 0 0 20px;
    text-align: justify;
    text-justify: inter-word;
  }

  .signature-wrap {
    margin-top: 36px;
    text-align: right;
    font-size: 16px;
    line-height: 1.6;
  }

  .signature-wrap .sig-name {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: var(--red);
    margin-top: 4px;
    font-family: "Galada", "Noto Serif Bengali", cursive, serif;
  }

  /* Bottom Envelope Card */
  .mixed-wrap {
    margin-top: 44px;
    padding-top: 34px;
    border-top: 1px dashed var(--line);
  }

  .mini-envelope {
    position: relative;
    background: linear-gradient(160deg, #EFE7D2, var(--paper));
    border-radius: 8px;
    padding: 22px 24px;
    box-shadow: 0 6px 20px rgba(42, 39, 35, 0.12);
  }

  .mini-envelope .stripe-border { border-width: 6px; }

  .mini-grid {
    display: flex;
    gap: 24px;
  }

  .mini-col {
    flex: 1;
    min-width: 0;
  }

  .mini-col + .mini-col {
    border-left: 1px solid var(--line);
    padding-left: 24px;
  }

  .field-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--red);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .field {
    font-size: 14.5px;
    line-height: 1.55;
  }

  .stamp-mini {
    position: absolute;
    top: 14px; right: 16px;
    width: 40px;
    height: 40px;
  }

  /* Action Bar for Recipients */
  .recipient-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 32px;
    flex-wrap: wrap;
  }

  .btn-action {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--ink);
    padding: 8px 18px;
    border-radius: 9999px;
    font-size: 13.5px;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.25s ease;
  }

  .btn-action:hover {
    border-color: var(--red);
    color: var(--red);
    background: rgba(220, 59, 38, 0.05);
    transform: translateY(-1px);
  }

  /* Toast Notification */
  #toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translate(-50%, 16px);
    background: var(--ink);
    color: var(--paper);
    font-size: 13.5px;
    padding: 10px 20px;
    border-radius: 9999px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 100;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  #toast.show {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (max-width: 580px) {
    .mini-grid { flex-direction: column; gap: 16px; }
    .mini-col + .mini-col { border-left: none; padding-left: 0; border-top: 1px solid var(--line); padding-top: 16px; }
    .addr-grid { flex-direction: column; gap: 10px; }
    .addr-grid .divider { display: none; }
    .envelope-body { padding: 16px 20px; }
  }

  @media print {
    #stage, .recipient-actions { display: none !important; }
    #letterPage { display: block !important; opacity: 1 !important; transform: none !important; padding: 0 !important; }
    .sheet { box-shadow: none !important; border: none !important; padding: 0 !important; }
  }
</style>
</head>
<body>

  <!-- 1. ENVELOPE STAGE -->
  <div id="stage">
    <div class="envelope-wrap">
      <div class="envelope" id="envelope" role="button" tabindex="0" aria-label="চিঠি খুলতে ট্যাপ বা ক্লিক করুন">
        
        <!-- Sliding Folded Letter inside pocket -->
        <div class="sliding-letter">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:6px; font-size:11px; opacity:0.8;">
            <span>${escapeHtml(data.letterDate || 'একান্তে চিঠি')}</span>
            <span style="color:var(--red); font-weight:bold;">গোপনীয়</span>
          </div>
          <div style="text-align:center; padding: 4px 0;">
            <div style="font-weight:bold; font-size:14px; color:var(--ink);">${escapeHtml(data.titleWord1)} ${escapeHtml(data.titleWord2)} <span style="color:var(--gold);">${escapeHtml(data.titleWord3)}</span></div>
            <div style="font-size:12px; font-weight:600; color:var(--ink); margin-top:2px;">${escapeHtml(data.salutation)}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(0,0,0,0.08); padding-top:6px; font-size:11px; color:var(--ink); opacity:0.85;">
            <span>ইতি, <strong style="color:var(--red);">${escapeHtml(data.signatureName)}</strong></span>
            <span style="color:var(--gold); font-weight:bold;">চিঠি খুলছে...</span>
          </div>
        </div>

        <!-- Front Pocket Paper -->
        <div class="front-pocket"></div>
        <div class="stripe-border"></div>

        ${stampSvg}

        <div class="envelope-body" style="z-index: 3;">
          <div class="addr-grid">
            <div>
              <div class="label">প্রেরক</div>
              <div>${escapeHtml(data.senderName)}</div>
            </div>
            <div class="divider"></div>
            <div>
              <div class="label">প্রাপক</div>
              <div>${escapeHtml(data.receiverName)}</div>
            </div>
          </div>
        </div>

        <!-- Top Triangular Flap with Wax Seal -->
        <div class="flap-wrap">
          <div class="flap">
            ${waxSealHtml}
          </div>
        </div>

      </div>
    </div>

    <div class="open-hint-badge" id="openHintBtn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
      </svg>
      চিঠিটি খুলতে খামে চাপ দিন
    </div>
  </div>

  <!-- 2. LETTER CONTENT (RECIPIENT VIEW) -->
  <main id="letterPage">
    <article class="sheet ${fontClass}">
      ${data.letterDate ? `<div class="date-badge">${escapeHtml(data.letterDate)}</div>` : ''}

      <!-- MASTHEAD -->
      <header class="masthead">
        <div class="lockup">
          <span class="w1">${escapeHtml(data.titleWord1)}</span> <span class="w2">${escapeHtml(data.titleWord2)}</span>
          <span class="w3">${escapeHtml(data.titleWord3)}</span>
        </div>
        ${data.subtitle ? `<div class="tag">${escapeHtml(data.subtitle)}</div>` : ''}
      </header>

      <!-- LETTER CONTENT -->
      <section>
        ${data.salutation ? `<div class="salutation">${escapeHtml(data.salutation)}</div>` : ''}
        <div class="letter-body">
          ${paragraphHtml}
        </div>

        <div class="signature-wrap">
          <div>${escapeHtml(data.signOff)}</div>
          <span class="sig-name">${escapeHtml(data.signatureName)}</span>
        </div>
      </section>

      <!-- POSTAL FOOTER CARD -->
      <section class="mixed-wrap">
        <div class="mini-envelope">
          <div class="stripe-border"></div>
          ${stampMiniSvg}

          <div class="mini-grid">
            <div class="mini-col">
              <div class="field-label">প্রেরক</div>
              <div class="field">${senderHtml}</div>
            </div>
            <div class="mini-col">
              <div class="field-label">প্রাপক</div>
              <div class="field">${receiverHtml}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- RECIPIENT ACTIONS -->
      <div class="recipient-actions">
        <button class="btn-action" id="closeEnvBtn" type="button">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>
          পুনরায় খাম বন্ধ করুন
        </button>
        <button class="btn-action" id="copyTextBtn" type="button">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          চিঠি কপি করুন
        </button>
        <button class="btn-action" onclick="window.print()" type="button">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          মুদ্রণ / PDF
        </button>
      </div>

    </article>
  </main>

  <div id="toast"></div>

<script>
(function(){
  var stage = document.getElementById('stage');
  var envelope = document.getElementById('envelope');
  var openHintBtn = document.getElementById('openHintBtn');
  var letterPage = document.getElementById('letterPage');
  var closeEnvBtn = document.getElementById('closeEnvBtn');
  var copyTextBtn = document.getElementById('copyTextBtn');
  var toast = document.getElementById('toast');

  // Simple Web Audio paper rustle + chime
  function playOpenSound(){
    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      var ctx = new AudioContextClass();
      if (ctx.state === 'suspended') ctx.resume();

      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch(e) {}
  }

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ toast.classList.remove('show'); }, 2000);
  }

  function openLetter(){
    playOpenSound();
    envelope.classList.add('open');
    setTimeout(function(){
      stage.classList.add('hidden');
      letterPage.classList.add('show');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  }

  function closeLetter(){
    letterPage.classList.remove('show');
    setTimeout(function(){
      stage.classList.remove('hidden');
      envelope.classList.remove('open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }

  envelope.addEventListener('click', openLetter);
  openHintBtn.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
  });

  closeEnvBtn.addEventListener('click', closeLetter);

  copyTextBtn.addEventListener('click', function(){
    var fullText = ${JSON.stringify(
      `${data.salutation}\n\n${data.paragraphs.join('\n\n')}\n\n${data.signOff}\n${data.signatureName}\n\nপ্রেরক: ${data.senderName}\nপ্রাপক: ${data.receiverName}`
    )};
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(function(){
        showToast('চিঠির সম্পূর্ণ লেখা কপি করা হয়েছে!');
      });
    } else {
      showToast('কপি সফল!');
    }
  });
})();
</script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

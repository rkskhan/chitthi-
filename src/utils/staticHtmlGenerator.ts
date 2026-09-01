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

export function generateStaticRecipientHtml(data: LetterData): string {
  const theme = THEMES[data.theme] || THEMES.classic;
  const stampSvg = generateStampSvg(data.stampType, theme.accentRed);
  const stampMiniSvg = stampSvg.replace('class="stamp"', 'class="stamp-mini"');

  const paragraphHtml = data.paragraphs
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n          ');

  const senderHtml = escapeHtml(data.senderName) + (data.senderAddress ? `<br><span class="addr-sub">${escapeHtml(data.senderAddress).replace(/\n/g, '<br>')}</span>` : '');
  const receiverHtml = escapeHtml(data.receiverName) + (data.receiverAddress ? `<br><span class="addr-sub">${escapeHtml(data.receiverAddress).replace(/\n/g, '<br>')}</span>` : '');

  const fontClass = data.fontFamily === 'serif' ? 'font-serif-bengali' : data.fontFamily === 'galada' ? 'font-galada' : data.fontFamily === 'tiro' ? 'font-tiro' : 'font-hind';

  return `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.titleWord1)} ${escapeHtml(data.titleWord2)} ${escapeHtml(data.titleWord3)} — আপনার জন্য একটি চিঠি</title>
<meta name="description" content="${escapeHtml(data.subtitle)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Galada&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700;800&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">
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

  .font-serif-bengali { font-family: "Noto Serif Bengali", serif; }
  .font-hind { font-family: "Hind Siliguri", sans-serif; }
  .font-galada { font-family: "Galada", cursive, sans-serif; }
  .font-tiro { font-family: "Tiro Bangla", serif; }

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
    max-width: 480px;
    perspective: 1600px;
    margin-bottom: 20px;
  }

  .envelope {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: var(--paper);
    border-radius: 8px;
    box-shadow: var(--envelope-shadow);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    user-select: none;
  }

  .envelope:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 28px 65px rgba(0, 0, 0, 0.26);
  }

  .envelope:active {
    transform: translateY(-1px) scale(0.99);
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
  }

  .flap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 54%;
    background: linear-gradient(160deg, #EFE7D2, var(--paper));
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    transform-origin: top center;
    transition: transform 0.8s cubic-bezier(0.6, -0.1, 0.2, 1.15);
    border-bottom: 1px solid var(--line);
    z-index: 5;
  }

  .envelope.open .flap {
    transform: rotateX(180deg);
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
        <div class="stripe-border"></div>

        ${stampSvg}

        <div class="envelope-body">
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

        <div class="flap"></div>
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
    }, 650);
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

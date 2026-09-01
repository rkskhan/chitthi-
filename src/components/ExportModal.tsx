import React, { useState } from 'react';
import { LetterData } from '../types';
import { generateStaticRecipientHtml } from '../utils/staticHtmlGenerator';
import { getShareableRecipientUrl } from '../utils/urlSharing';
import { 
  formatBengaliLetterForEmail, 
  buildMailtoUrl, 
  buildGmailWebComposeUrl, 
  buildOutlookWebComposeUrl,
  EmailLetterFormat 
} from '../utils/emailSharing';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  Share2, 
  FileCode, 
  ExternalLink,
  Sparkles,
  Info,
  Globe,
  CloudUpload,
  Mail,
  Send,
  Trash2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Props {
  data: LetterData;
  isOpen: boolean;
  onClose: () => void;
  onClearLetter?: () => void;
}

export const ExportModal: React.FC<Props> = ({ data, isOpen, onClose, onClearLetter }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'download' | 'link' | 'code' | 'netlify'>('email');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmailText, setCopiedEmailText] = useState(false);

  // Email form state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState(() => {
    const receiver = data.receiverName ? `${data.receiverName}-এর জন্য ` : '';
    const title = [data.titleWord1, data.titleWord2, data.titleWord3].filter(Boolean).join(' ') || 'চিঠি';
    return `চিঠি: ${receiver}${title}`;
  });
  const [emailFormat, setEmailFormat] = useState<EmailLetterFormat>('full');
  const [autoClearAfterSend, setAutoClearAfterSend] = useState(false);
  const [isClearedBannerVisible, setIsClearedBannerVisible] = useState(false);

  if (!isOpen) return null;

  const staticHtml = generateStaticRecipientHtml(data);
  const shareUrl = getShareableRecipientUrl(data);
  const emailBodyText = formatBengaliLetterForEmail(data, emailFormat);
  const mailtoLink = buildMailtoUrl(recipientEmail, emailSubject, emailBodyText);
  const gmailWebLink = buildGmailWebComposeUrl(recipientEmail, emailSubject, emailBodyText);
  const outlookWebLink = buildOutlookWebComposeUrl(recipientEmail, emailSubject, emailBodyText);

  const handleDownloadHtml = () => {
    const blob = new Blob([staticHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chithi-${data.receiverName.replace(/\s+/g, '-').toLowerCase() || 'recipient'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(staticHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmailBody = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopiedEmailText(true);
    setTimeout(() => setCopiedEmailText(false), 2000);
  };

  const handleOpenPreviewNewTab = () => {
    const blob = new Blob([staticHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleOpenMailto = () => {
    window.location.href = mailtoLink;
    if (autoClearAfterSend && onClearLetter) {
      setTimeout(() => {
        onClearLetter();
        setIsClearedBannerVisible(true);
      }, 500);
    }
  };

  const handleOpenGmail = () => {
    window.open(gmailWebLink, '_blank');
    if (autoClearAfterSend && onClearLetter) {
      setTimeout(() => {
        onClearLetter();
        setIsClearedBannerVisible(true);
      }, 500);
    }
  };

  const handleDirectClearFromModal = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে ওয়েবসাইট থেকে আপনার এই ব্যক্তিগত চিঠির সব লেখা মুছে ফেলতে চান? এটি মুছে দিলে ব্রাউজার মেমোরিতে আর কোনো লেখা থাকবে না।')) {
      if (onClearLetter) {
        onClearLetter();
        setIsClearedBannerVisible(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">চিঠি পাঠান ও বন্ধুদের সাথে শেয়ার করুন</h2>
              <p className="text-xs text-neutral-500">ইমেইল, স্ট্যাটিক ডাউনলোড বা সরাসরি অ্যানিমেটেড ওয়েব লিংকের মাধ্যমে পাঠান</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-50/80 px-4 sm:px-6 pt-2 gap-1 sm:gap-2 text-xs sm:text-sm font-medium overflow-x-auto select-none">
          <button
            id="tab-export-email"
            onClick={() => setActiveTab('email')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'email' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>ইমেইলে পাঠান (Mailto)</span>
          </button>

          <button
            id="tab-export-download"
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'download' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>HTML ফাইল ডাউনলোড</span>
          </button>

          <button
            id="tab-export-link"
            onClick={() => setActiveTab('link')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'link' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>ওয়েব লিংক</span>
          </button>

          <button
            id="tab-export-code"
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'code' 
                ? 'border-amber-600 text-amber-700 font-bold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>HTML কোড</span>
          </button>

          <button
            id="tab-export-netlify"
            onClick={() => setActiveTab('netlify')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'netlify' 
                ? 'border-teal-600 text-teal-700 font-bold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Netlify ডেপ্লয়</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-neutral-700 flex-1">
          
          {/* ================= TAB 1: EMAIL SEND (MAILTO) ================= */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              
              {/* Privacy Banner if user cleared */}
              {isClearedBannerVisible && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">
                    আপনার ব্যক্তিগত চিঠির টেক্সট ওয়েবসাইট ও ব্রাউজার মেমোরি থেকে সম্পূর্ণ মুছে ফেলা হয়েছে।
                  </span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">সরাসরি ইমেইল ঠিকানায় পাঠানোর সুবিধা (Mailto Encodings)</div>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    বাংলা চিঠির পূর্ণ টেক্সট ও ইন্টারঅ্যাক্টিভ লিংক স্বয়ংক্রিয়ভাবে এনকোড করে সরাসরি প্রাপকের ইমেইল অ্যাপ বা জিমেইলে পাঠানো যাবে।
                  </p>
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-3 bg-neutral-50/60 p-4 rounded-xl border border-neutral-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      প্রাপকের ইমেইল ঠিকানা (To):
                    </label>
                    <input
                      id="recipient-email-input"
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="e.g. friend@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      ইমেইল বিষয় (Subject):
                    </label>
                    <input
                      id="email-subject-input"
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="ইমেইলের বিষয় লিখুন"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Format selection */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    ইমেইল বার্তার ধরণ:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEmailFormat('full')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        emailFormat === 'full'
                          ? 'border-amber-600 bg-amber-50 font-bold text-amber-900 shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div>সম্পূর্ণ চিঠি + ওয়েব লিংক</div>
                      <div className="text-[10px] font-normal text-neutral-500 mt-0.5">সব বাংলা লেখা ও লিংক সহ</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailFormat('invitation')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        emailFormat === 'invitation'
                          ? 'border-amber-600 bg-amber-50 font-bold text-amber-900 shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div>শুধু নিমন্ত্রণ বার্তা + লিংক</div>
                      <div className="text-[10px] font-normal text-neutral-500 mt-0.5">অ্যানিমেটেড খাম খোলার জন্য</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailFormat('text-only')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        emailFormat === 'text-only'
                          ? 'border-amber-600 bg-amber-50 font-bold text-amber-900 shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div>খাঁটি বাংলা টেক্সট</div>
                      <div className="text-[10px] font-normal text-neutral-500 mt-0.5">কোনো লিংক ছাড়া শুধু চিঠি</div>
                    </button>
                  </div>
                </div>

                {/* Email Body Preview & Copy */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      ইমেইল বার্তার প্রিভিউ ({emailBodyText.length} অক্ষর):
                    </span>
                    <button
                      id="copy-email-body-btn"
                      type="button"
                      onClick={handleCopyEmailBody}
                      className="text-xs text-amber-700 hover:text-amber-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedEmailText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmailText ? 'কপি হয়েছে' : 'বার্তা কপি করুন'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white border border-neutral-300 rounded-lg text-xs font-mono max-h-32 overflow-y-auto whitespace-pre-wrap text-neutral-800 leading-relaxed shadow-2xs">
                    {emailBodyText}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  id="send-mailto-app-btn"
                  onClick={handleOpenMailto}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-lg text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>ইমেইল অ্যাপে পাঠান (Mailto)</span>
                </button>

                <button
                  id="open-gmail-web-btn"
                  onClick={handleOpenGmail}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs sm:text-sm"
                  title="Google Gmail ওয়েবে সরাসরি চিঠি কম্পোজ করুন"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Gmail-এ খুলুন</span>
                </button>

                <button
                  id="open-outlook-web-btn"
                  onClick={() => window.open(outlookWebLink, '_blank')}
                  className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                  title="Outlook / Hotmail-এ খুলুন"
                >
                  <span>Outlook</span>
                </button>
              </div>

              {/* Privacy / Wipe from Website Section */}
              <div className="p-3.5 rounded-xl bg-neutral-100/90 border border-neutral-300/80 space-y-2 mt-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>গোপনীয়তা রক্ষা: ওয়েবসাইট থেকে চিঠি মুছে ফেলুন</span>
                  </div>
                  
                  <button
                    id="modal-wipe-website-letter-btn"
                    onClick={handleDirectClearFromModal}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ওয়েবসাইট থেকে চিঠি মুছুন</span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  ইমেইল পাঠানো শেষ হলে আপনার ব্যক্তিগত চিঠির লেখা মুছে দিতে পারেন, যাতে পরবর্তীতে এই ডিভাইসে বা ব্রাউজারে কেউ আপনার ব্যক্তিগত চিঠি দেখতে না পায়।
                </p>
                <label className="flex items-center gap-2 pt-1 text-xs text-neutral-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoClearAfterSend}
                    onChange={(e) => setAutoClearAfterSend(e.target.checked)}
                    className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>ইমেইল পাঠানোর বোতাম চাপার সাথে সাথেই স্বয়ংক্রিয়ভাবে খসড়াটি মুছে দিন</span>
                </label>
              </div>

            </div>
          )}

          {/* ================= TAB 2: DOWNLOAD STATIC HTML ================= */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950 mb-1">১০০% স্বয়ংসম্পূর্ণ সিঙ্গেল ফাইল HTML</div>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    এই ডাউনলোডকৃত <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[11px]">.html</code> ফাইলে এডিটর বা রিসেট টুলের কোনো চিহ্ন থাকবে না। আপনার বন্ধু ফাইলটি যেকোনো ব্রাউজারে (মোবাইল/কম্পিউটার/হোয়াটসঅ্যাপ) ওপেন করলেই অ্যানিমেটেড খাম ও চিঠি দেখতে পাবে।
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="download-html-file-btn"
                  onClick={handleDownloadHtml}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>স্ট্যাটিক HTML ফাইল ডাউনলোড করুন</span>
                </button>

                <button
                  id="test-tab-preview-btn"
                  onClick={handleOpenPreviewNewTab}
                  className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>নতুন ট্যাবে টেস্ট করুন</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 3: SHARE LINK ================= */}
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950 mb-1">তাত্ক্ষণিক ওয়েব লিঙ্ক</div>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    এই লিংকে ক্লিক করলে আপনার বন্ধু সরাসরি কেবল চিঠি প্রাপক দর্শন (Part 2) দেখতে পাবে। এডিটর প্যানেল সম্পূর্ণ লুকানো থাকবে।
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  বন্ধুর জন্য শেয়ার লিংক:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 px-3 py-2 text-xs bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700 font-mono select-all focus:outline-none"
                  />
                  <button
                    id="copy-share-url-btn"
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'কপি হয়েছে' : 'কপি লিংক'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: HTML CODE ================= */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  স্ট্যাটিক ২য় অংশের এইচটিএমএল কোড ({staticHtml.length.toLocaleString()} অক্ষর):
                </span>
                <button
                  id="copy-raw-html-code-btn"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'সম্পূর্ণ কোড কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-900 text-amber-200 text-xs font-mono rounded-xl max-h-56 overflow-auto border border-neutral-800 leading-relaxed">
                <code>{staticHtml}</code>
              </pre>
            </div>
          )}

          {/* ================= TAB 5: NETLIFY ================= */}
          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 text-xs sm:text-sm flex items-start gap-3">
                <CloudUpload className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">Netlify-তে ডেপ্লয় করার জন্য সম্পূর্ণ প্রস্তুত!</div>
                  <p className="leading-relaxed text-teal-900 text-xs">
                    প্রকল্পটিতে <code className="bg-teal-100 px-1 py-0.5 rounded font-mono text-[11px]">netlify.toml</code> এবং <code className="bg-teal-100 px-1 py-0.5 rounded font-mono text-[11px]">public/_redirects</code> স্বয়ংক্রিয়ভাবে তৈরি ও কনফিগার করা রয়েছে।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">১</span>
                    <span>উপায় ১: GitHub / Git ডিপ্লয়</span>
                  </div>
                  <ul className="text-neutral-600 space-y-1 pl-6 list-disc">
                    <li>Build command: <code className="bg-neutral-200 px-1 rounded font-mono">npm run build</code></li>
                    <li>Publish directory: <code className="bg-neutral-200 px-1 rounded font-mono">dist</code></li>
                    <li><code className="text-[11px] text-teal-800">netlify.toml</code> নিজেই বাকি সব হ্যান্ডেল করবে।</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">২</span>
                    <span>উপায় ২: Netlify Drop (ড্র্যাগ & ড্রপ)</span>
                  </div>
                  <ul className="text-neutral-600 space-y-1 pl-6 list-disc">
                    <li>টার্মিনালে <code className="bg-neutral-200 px-1 rounded font-mono">npm run build</code> চালান</li>
                    <li>তৈরি হওয়া <code className="bg-neutral-200 px-1 rounded font-mono">dist</code> ফোল্ডারটি <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-teal-700 underline font-medium inline-flex items-center gap-0.5">Netlify Drop <ExternalLink className="w-3 h-3 inline" /></a> এ টেনে এনে ছেড়ে দিন!</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-neutral-900 rounded-xl text-neutral-300 font-mono text-[11px] space-y-1">
                <div className="text-neutral-400 font-semibold mb-1">netlify.toml কনফিগারেশন:</div>
                <div className="text-emerald-400">[build]</div>
                <div>  command = "npm run build"</div>
                <div>  publish = "dist"</div>
                <div className="text-emerald-400 mt-1">[[redirects]]</div>
                <div>  from = "/*"</div>
                <div>  to = "/index.html"</div>
                <div>  status = 200</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {activeTab === 'email' && '💌 সম্পূর্ণ বাংলা বর্ণমালা ও ইউআরআই এনকোডিং সমর্থিত'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-medium bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

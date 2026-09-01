import React, { useState } from 'react';
import { LetterData } from '../types';
import { generateStaticRecipientHtml } from '../utils/staticHtmlGenerator';
import { getShareableRecipientUrl } from '../utils/urlSharing';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  Share2, 
  FileCode, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  data: LetterData;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ data, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'download' | 'link' | 'code'>('download');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const staticHtml = generateStaticRecipientHtml(data);
  const shareUrl = getShareableRecipientUrl(data);

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

  const handleOpenPreviewNewTab = () => {
    const blob = new Blob([staticHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]"
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
              <h2 className="text-base font-bold text-neutral-900">বন্ধুদের জন্য স্ট্যাটিক ২য় অংশ পাঠান</h2>
              <p className="text-xs text-neutral-500">আপনার বন্ধুরা কোনো এডিটর ছাড়া শুধু খাঁটি চিঠিটি দেখবে</p>
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
        <div className="flex border-b border-neutral-200 bg-neutral-50/80 px-6 pt-2 gap-2 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'download' 
                ? 'border-amber-600 text-amber-700 font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>স্ট্যাটিক ফাইল ডাউনলোড (.html)</span>
          </button>

          <button
            onClick={() => setActiveTab('link')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'link' 
                ? 'border-amber-600 text-amber-700 font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>অনলাইন লিংক শেয়ার</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'code' 
                ? 'border-amber-600 text-amber-700 font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>HTML কোড কপি</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-neutral-700">
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950 mb-1">১০০% স্বয়ংসম্পূর্ণ সিঙ্গেল ফাইল HTML</div>
                  <p className="leading-relaxed">
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

          {activeTab === 'link' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-950 mb-1">তাত্ক্ষণিক ওয়েব লিঙ্ক</div>
                  <p className="leading-relaxed">
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
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex justify-end">
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

import React, { useState, useEffect } from 'react';
import { LetterData, ViewMode } from './types';
import { DEFAULT_LETTER } from './utils/templates';
import { decodeLetterData } from './utils/urlSharing';
import { EditorPanel } from './components/EditorPanel';
import { LivePreview } from './components/LivePreview';
import { RecipientLetterView } from './components/RecipientLetterView';
import { ExportModal } from './components/ExportModal';
import { 
  FileText, 
  Eye, 
  Share2, 
  Download, 
  Columns, 
  Smartphone, 
  Sparkles,
  Info
} from 'lucide-react';

const STORAGE_KEY = 'chithi_creator_draft_v2';

export default function App() {
  const [data, setData] = useState<LetterData>(() => {
    // Check if URL has encoded data
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('d');
      if (encoded) {
        const decoded = decodeLetterData(encoded);
        if (decoded) return decoded;
      }
      // Check local storage draft
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_LETTER, ...JSON.parse(saved) };
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_LETTER;
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode') || params.get('view');
      if (mode === 'friend' || mode === 'recipient') {
        return 'friend-view';
      }
    }
    return 'preview-split';
  });

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'editor' | 'preview'>('editor');

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const handleReset = () => {
    if (window.confirm('আপনি কি পূর্বের মূল লেখায় ফিরে যেতে চান? আপনার বর্তমান পরিবর্তনগুলো মুছে যাবে।')) {
      setData(DEFAULT_LETTER);
    }
  };

  // If the page is in direct Recipient View (or user clicked Preview as Friend)
  if (viewMode === 'friend-view') {
    return (
      <RecipientLetterView 
        data={data} 
        isCreatorPreview={true} 
        onExitPreview={() => setViewMode('preview-split')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col font-sans">
      {/* Top Application Navigation Bar */}
      <header className="bg-neutral-950 text-white border-b border-neutral-800 sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 shadow-md">
              <span className="font-extrabold text-lg">চি</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-amber-50 tracking-wide">
                  চিঠি নির্মাতা ও প্রাপক ভিউ
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  ২ পর্ব সিস্টেম
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                ১ম পর্ব (ওয়েব এডিটর) দিয়ে চিঠি তৈরি করুন এবং বন্ধুদের জন্য ২য় পর্ব (স্ট্যাটিক চিঠি) পাঠান
              </p>
            </div>
          </div>

          {/* Desktop View Switcher & Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Mode Toggle for Desktop */}
            <div className="hidden md:flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                id="mode-split-btn"
                onClick={() => setViewMode('preview-split')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'preview-split'
                    ? 'bg-neutral-800 text-amber-300 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>স্প্লিট ভিউ (এডিটর + লাইভ)</span>
              </button>

              <button
                id="mode-editor-btn"
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'editor'
                    ? 'bg-neutral-800 text-amber-300 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>শুধু এডিটর (১ম পর্ব)</span>
              </button>

              <button
                id="mode-friend-preview-btn"
                onClick={() => setViewMode('friend-view')}
                className="px-3 py-1.5 rounded-lg font-medium text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                title="বন্ধুর ভিউ পরীক্ষা করুন"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>বন্ধু দর্শন মোড (২য় পর্ব)</span>
              </button>
            </div>

            {/* Friend Preview Button on Mobile */}
            <button
              id="mobile-friend-preview-btn"
              onClick={() => setViewMode('friend-view')}
              className="md:hidden p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 transition-colors cursor-pointer border border-neutral-700"
              title="বন্ধুর ভিউ প্রিভিউ"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Export Modal Trigger */}
            <button
              id="export-top-bar-btn"
              onClick={() => setIsExportModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
            >
              <Share2 className="w-4 h-4" />
              <span>২য় অংশ রপ্তানি / ডাউনলোড</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Switcher (Editor vs Preview) */}
      <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-center gap-2">
        <button
          onClick={() => setMobileActiveTab('editor')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer ${
            mobileActiveTab === 'editor'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          ১ম পর্ব: এডিটর
        </button>
        <button
          onClick={() => setMobileActiveTab('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer ${
            mobileActiveTab === 'preview'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          ২য় পর্ব: লাইভ প্রিভিউ
        </button>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6">
        
        {/* Helper Banner explaining the 2-part structure */}
        <div className="mb-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">২ পর্ব সমাধান:</span>{' '}
              <span className="text-amber-900">
                ১ম পর্ব (বামপাশে) আপনার ব্যবহারের জন্য সম্পাদনযোগ্য। কাজ শেষ হলে <strong>২য় অংশ রপ্তানি</strong> বাটনে চাপ দিয়ে বন্ধুদের জন্য খাঁটি স্ট্যাটিক চিঠিটি (.html) ডাউনলোড বা শেয়ার করুন।
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 hover:underline shrink-0 text-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>এখনই পাঠান</span>
          </button>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="h-[calc(100vh-185px)] min-h-[620px]">
          
          {/* Split Mode (Desktop default) */}
          {viewMode === 'preview-split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 h-full">
              <div className={`h-full ${mobileActiveTab === 'preview' ? 'hidden md:block' : 'block'}`}>
                <EditorPanel
                  data={data}
                  onChange={setData}
                  onReset={handleReset}
                  onEnterFriendPreview={() => setViewMode('friend-view')}
                  onOpenExportModal={() => setIsExportModalOpen(true)}
                />
              </div>

              <div className={`h-full ${mobileActiveTab === 'editor' ? 'hidden md:block' : 'block'}`}>
                <LivePreview
                  data={data}
                  onEnterFriendPreview={() => setViewMode('friend-view')}
                  onOpenExportModal={() => setIsExportModalOpen(true)}
                />
              </div>
            </div>
          )}

          {/* Editor Only Mode */}
          {viewMode === 'editor' && (
            <div className="max-w-3xl mx-auto h-full">
              <EditorPanel
                data={data}
                onChange={setData}
                onReset={handleReset}
                onEnterFriendPreview={() => setViewMode('friend-view')}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Export & Sharing Modal */}
      <ExportModal
        data={data}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

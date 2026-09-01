import React, { useState } from 'react';
import { LetterData } from '../types';
import { THEMES } from '../utils/templates';
import { RecipientLetterView } from './RecipientLetterView';
import { Eye, Smartphone, Monitor, Maximize2, Share2 } from 'lucide-react';

interface Props {
  data: LetterData;
  onEnterFriendPreview: () => void;
  onOpenExportModal: () => void;
}

export const LivePreview: React.FC<Props> = ({
  data,
  onEnterFriendPreview,
  onOpenExportModal,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'responsive'>('responsive');
  const theme = THEMES[data.theme] || THEMES.classic;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden flex flex-col h-full">
      {/* Top Preview Controls */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">
              <span>লাইভ প্রিভিউ (২য় অংশ)</span>
              <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
                রিয়েল-টাইম
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">আপনার বন্ধুরা চিঠিটি ঠিক যেভাবে দেখতে পাবে</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="bg-neutral-800 p-1 rounded-lg flex items-center gap-1 border border-neutral-700">
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                deviceMode === 'responsive' ? 'bg-neutral-700 text-amber-300 font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="রেসপনসিভ প্রিভিউ"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                deviceMode === 'mobile' ? 'bg-neutral-700 text-amber-300 font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="মোবাইল ফোন প্রিভিউ"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Full-screen friend preview */}
          <button
            onClick={onEnterFriendPreview}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-amber-300 transition-colors cursor-pointer"
            title="ফুল-স্ক্রিন বন্ধু ভিউ"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Export button */}
          <button
            onClick={onOpenExportModal}
            className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>রপ্তানি</span>
          </button>
        </div>
      </div>

      {/* Preview Container Frame */}
      <div 
        className="flex-1 overflow-y-auto p-4 flex items-start justify-center transition-colors"
        style={{ backgroundColor: theme.cream }}
      >
        <div
          className={`w-full transition-all duration-300 ${
            deviceMode === 'mobile'
              ? 'max-w-[390px] min-h-[720px] bg-white rounded-[36px] shadow-2xl border-[10px] border-neutral-800 overflow-hidden relative my-2'
              : 'max-w-3xl'
          }`}
        >
          {deviceMode === 'mobile' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-800 rounded-full z-30 pointer-events-none" />
          )}

          <div className="w-full">
            <RecipientLetterView data={data} isCreatorPreview={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

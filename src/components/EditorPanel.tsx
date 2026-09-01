import React, { useState } from 'react';
import { LetterData } from '../types';
import { TEMPLATES, THEMES, WAX_SEALS, WAX_COLORS, BENGALI_FONTS } from '../utils/templates';
import { WaxSeal } from './WaxSeal';
import { 
  FileText, 
  MapPin, 
  Palette, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Eye, 
  Download, 
  Share2,
  Copy,
  BookOpen,
  Mail,
  ShieldCheck,
  Eraser,
  Flame,
  Award,
  Type,
  Check,
  ChevronDown
} from 'lucide-react';

interface Props {
  data: LetterData;
  onChange: (newData: LetterData) => void;
  onReset: () => void;
  onClearAllText?: () => void;
  onEnterFriendPreview: () => void;
  onOpenExportModal: () => void;
}

export const EditorPanel: React.FC<Props> = ({
  data,
  onChange,
  onReset,
  onClearAllText,
  onEnterFriendPreview,
  onOpenExportModal,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'address' | 'design' | 'templates'>('content');
  const [bulkMode, setBulkMode] = useState(false);

  const updateField = <K extends keyof LetterData>(field: K, value: LetterData[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...data.paragraphs];
    updated[index] = val;
    updateField('paragraphs', updated);
  };

  const handleAddParagraph = () => {
    updateField('paragraphs', [...data.paragraphs, 'নতুন অনুচ্ছেদ এখানে লিখুন...']);
  };

  const handleRemoveParagraph = (index: number) => {
    if (data.paragraphs.length <= 1) return;
    const updated = data.paragraphs.filter((_, i) => i !== index);
    updateField('paragraphs', updated);
  };

  const handleBulkTextChange = (text: string) => {
    const paras = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    updateField('paragraphs', paras.length > 0 ? paras : ['']);
  };

  const applyTemplate = (templateData: Partial<LetterData>) => {
    onChange({ ...data, ...templateData });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden flex flex-col h-full">
      {/* Top Banner / Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-amber-50">১ম পর্ব: চিঠি নির্মাতা (Editor View)</h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-amber-500/30">
                ওয়েব ভিউ
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              এখানে চিঠি সম্পাদনা করুন এবং বন্ধুদের জন্য প্রস্তুত স্ট্যাটিক ২য় পর্ব রপ্তানি করুন
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="open-friend-preview-top-btn"
            onClick={onEnterFriendPreview}
            className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 font-medium px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="বন্ধুরা যেমন দেখবে তা পরীক্ষা করুন"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">বন্ধু দর্শন প্রিভিউ</span>
            <span className="sm:hidden">প্রিভিউ</span>
          </button>

          <button
            id="open-export-modal-top-btn"
            onClick={onOpenExportModal}
            className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>পাঠান / রপ্তানি</span>
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 sm:px-6 pt-2 gap-2 text-xs sm:text-sm overflow-x-auto select-none">
        <button
          id="tab-content-btn"
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-3 border-b-2 font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'content'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>চিঠির মূল কথা</span>
        </button>

        <button
          id="tab-address-btn"
          onClick={() => setActiveTab('address')}
          className={`pb-3 px-3 border-b-2 font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'address'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>প্রেরক ও প্রাপক</span>
        </button>

        <button
          id="tab-design-btn"
          onClick={() => setActiveTab('design')}
          className={`pb-3 px-3 border-b-2 font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'design'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>ডিজাইন ও স্ট্যাম্প</span>
        </button>

        <button
          id="tab-templates-btn"
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-3 border-b-2 font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'templates'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>তৈরি নমুনা</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-sm text-neutral-800">
        
        {/* ================= TAB 1: CONTENT ================= */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Occasion Masthead */}
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                চিঠির শিরোনাম (Masthead Title)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[11px] text-neutral-500 mb-1 block">শব্দ ১ (লাল)</span>
                  <input
                    id="title-word-1-input"
                    type="text"
                    value={data.titleWord1}
                    onChange={(e) => updateField('titleWord1', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="চিঠি"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 mb-1 block">শব্দ ২ (কালো)</span>
                  <input
                    id="title-word-2-input"
                    type="text"
                    value={data.titleWord2}
                    onChange={(e) => updateField('titleWord2', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="দিবসের"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 mb-1 block">শব্দ ৩ (সোনালী)</span>
                  <input
                    id="title-word-3-input"
                    type="text"
                    value={data.titleWord3}
                    onChange={(e) => updateField('titleWord3', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="শুভেচ্ছা"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] text-neutral-500 mb-1 block">সাবটাইটেল / বার্তা</span>
                <input
                  id="subtitle-input"
                  type="text"
                  value={data.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="প্রতিটি না-বলা কথার জন্য একটি দিন"
                />
              </div>
            </div>

            {/* Salutation & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  সম্বোধন (Salutation)
                </label>
                <input
                  id="salutation-input"
                  type="text"
                  value={data.salutation}
                  onChange={(e) => updateField('salutation', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium"
                  placeholder="আমার প্রাণের অর্ধাঙ্গিনী,"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  তারিখ (Date)
                </label>
                <input
                  id="letter-date-input"
                  type="text"
                  value={data.letterDate}
                  onChange={(e) => updateField('letterDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="০১ সেপ্টেম্বর, ২০২৬"
                />
              </div>
            </div>

            {/* Paragraphs Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  চিঠির অনুচ্ছেদসমূহ ({data.paragraphs.length}টি প্যারাগ্রাফ)
                </label>
                <button
                  onClick={() => setBulkMode(!bulkMode)}
                  className="text-xs text-amber-700 hover:text-amber-900 font-medium underline cursor-pointer"
                >
                  {bulkMode ? 'পৃথক অনুচ্ছেদ মোড' : 'একত্রিত টেক্সট মোড'}
                </button>
              </div>

              {bulkMode ? (
                <div>
                  <textarea
                    rows={8}
                    value={data.paragraphs.join('\n\n')}
                    onChange={(e) => handleBulkTextChange(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-neutral-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="প্যারাগ্রাফ আলাদা করতে দুটি এন্টার চাপুন..."
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার (Double Enter) ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-2 items-start group">
                      <span className="text-xs font-mono text-neutral-400 pt-3 select-none w-4">
                        {index + 1}.
                      </span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => handleParagraphChange(index, e.target.value)}
                        className="flex-1 p-3 text-sm bg-white border border-neutral-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder={`অনুচ্ছেদ ${index + 1}...`}
                      />
                      {data.paragraphs.length > 1 && (
                        <button
                          onClick={() => handleRemoveParagraph(index)}
                          className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0 mt-1"
                          title="অনুচ্ছেদ মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    id="add-paragraph-btn"
                    onClick={handleAddParagraph}
                    className="w-full py-2.5 border border-dashed border-amber-300 hover:border-amber-500 text-amber-700 hover:text-amber-800 bg-amber-50/50 hover:bg-amber-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন অনুচ্ছেদ যোগ করুন</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sign-off and Signature Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  সমাপ্তি বাক্য (Sign-off)
                </label>
                <input
                  id="signoff-input"
                  type="text"
                  value={data.signOff}
                  onChange={(e) => updateField('signOff', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="ইতি তোমার,"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                  স্বাক্ষরের নাম (Signature Name)
                </label>
                <input
                  id="signature-name-input"
                  type="text"
                  value={data.signatureName}
                  onChange={(e) => updateField('signatureName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-bold text-red-600"
                  placeholder="সাগর"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ADDRESSES ================= */}
        {activeTab === 'address' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Sender */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                  ১
                </div>
                <h3 className="font-bold text-sm text-neutral-900">প্রেরক বিবরণ (Sender / From)</h3>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">প্রেরকের নাম</label>
                <input
                  id="sender-name-input"
                  type="text"
                  value={data.senderName}
                  onChange={(e) => updateField('senderName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold"
                  placeholder="রেজাউল করিম সাগর"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">প্রেরকের ঠিকানা</label>
                <textarea
                  id="sender-address-input"
                  rows={2}
                  value={data.senderAddress}
                  onChange={(e) => updateField('senderAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                  placeholder="মেট্রো হাউজিং, বসিলা, মোহাম্মদপুর, ঢাকা-১২০৭"
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                  ২
                </div>
                <h3 className="font-bold text-sm text-neutral-900">প্রাপক বিবরণ (Receiver / To)</h3>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">প্রাপকের নাম</label>
                <input
                  id="receiver-name-input"
                  type="text"
                  value={data.receiverName}
                  onChange={(e) => updateField('receiverName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold"
                  placeholder="সামিয়া খান"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">প্রাপকের ঠিকানা</label>
                <textarea
                  id="receiver-address-input"
                  rows={2}
                  value={data.receiverAddress}
                  onChange={(e) => updateField('receiverAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                  placeholder="মিয়াজী বাড়ি, দরুন বাজার, সাচরা, বোরহানউদ্দিন, ভোলা-৮৩২০"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DESIGN & STAMP ================= */}
        {activeTab === 'design' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Themes Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                চিঠি ও খামের কালার থিম
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.values(THEMES).map((t) => {
                  const isSelected = data.theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => updateField('theme', t.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.accentRed }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.cream }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: t.accentNavy }} />
                      </div>
                      <div className="font-semibold text-xs text-neutral-900">{t.nameBn}</div>
                      <div className="text-[10px] text-neutral-500">{t.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Postal Stamp Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                ডাকটিকিট / পোস্টাল স্ট্যাম্প
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {[
                  { id: 'star', label: 'নক্ষত্র (Star)' },
                  { id: 'rose', label: 'গোলাপ (Rose)' },
                  { id: 'dove', label: 'পায়রা (Dove)' },
                  { id: 'heart', label: 'হৃদয় (Heart)' },
                  { id: 'postmark', label: 'ডাকমোহর (Seal)' },
                ].map((s) => {
                  const isSelected = data.stampType === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => updateField('stampType', s.id as LetterData['stampType'])}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20 font-bold text-amber-900'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <div className="text-xs">{s.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* WAX SEAL (খামের সিল মোহর) CUSTOMIZATION                                    */}
            {/* ========================================================================= */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-100/30 border border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">খামের সিল মোহর (Wax Seal)</h3>
                    <p className="text-[11px] text-neutral-500">বন্ধ চিঠির ত্রিকোণ ফ্ল্যাপে ব্যবহৃত ৩ডি মোমের সীল মোহর</p>
                  </div>
                </div>

                {/* Mini Visual Preview of Current Seal */}
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
                  <WaxSeal 
                    type={data.sealType || 'envelope-heart'} 
                    color={data.sealColor || 'crimson'} 
                    initialText={data.signatureName || data.senderName || 'চি'}
                    size="sm" 
                  />
                  <span className="text-xs font-semibold text-neutral-800">
                    {WAX_SEALS.find(s => s.id === data.sealType)?.nameBn || 'চিঠি ও হৃদয়'}
                  </span>
                </div>
              </div>

              {/* Seal Emblem Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  সিল মোহরের প্রতীক (Emblem Design)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {WAX_SEALS.map((s) => {
                    const isSelected = (data.sealType || 'envelope-heart') === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => updateField('sealType', s.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                          isSelected
                            ? 'border-amber-600 bg-amber-100/80 shadow-md ring-2 ring-amber-500/30'
                            : 'border-neutral-200 bg-white hover:border-amber-300 hover:bg-neutral-50'
                        }`}
                      >
                        <WaxSeal 
                          type={s.id} 
                          color={data.sealColor || 'crimson'} 
                          initialText={data.signatureName || data.senderName || 'চি'}
                          size="md" 
                        />
                        <div className="text-[11px] font-bold text-neutral-800 line-clamp-1">{s.nameBn}</div>
                        <div className="text-[9px] text-neutral-500 line-clamp-1">{s.nameEn}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seal Wax Color Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  সিল মোহরের রঙ ও মেটালিক ফিনিশ (Wax Color)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {WAX_COLORS.map((c) => {
                    const isSelected = (data.sealColor || 'crimson') === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => updateField('sealColor', c.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-amber-600 bg-amber-100/90 shadow-md ring-2 ring-amber-500/30'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div 
                          className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-white/60"
                          style={{ background: c.bgGradient }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-800 truncate">{c.nameBn}</div>
                          <div className="text-[9px] text-neutral-500 truncate">{c.nameEn}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BENGALI TYPOGRAPHY & FONT SELECTION (ড্রপডাউন ও ভিজ্যুয়াল কার্ড)          */}
            {/* ========================================================================= */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center shadow-xs">
                    <Type className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">চিঠির বাংলা ফন্ট নির্বাচন (Bengali Typography)</h3>
                    <p className="text-[11px] text-neutral-500">১২টি দৃষ্টিনন্দন বাংলা ফন্ট থেকে চিঠির অভ্যন্তরীণ শৈলী নির্বাচন করুন</p>
                  </div>
                </div>

                {/* Current Active Font Indicator */}
                {(() => {
                  const currentFont = BENGALI_FONTS.find(f => f.id === data.fontFamily) || 
                    (data.fontFamily === 'serif' ? BENGALI_FONTS.find(f => f.id === 'noto-serif') : null) || 
                    BENGALI_FONTS[0];
                  return (
                    <div className="flex items-center gap-1.5 self-start sm:self-auto bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-semibold border border-amber-300/80 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                      <span>{currentFont.nameBn}</span>
                    </div>
                  );
                })()}
              </div>

              {/* 1. Primary Dropdown Selector */}
              <div>
                <label 
                  htmlFor="bengali-font-select" 
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  ফন্ট ড্রপডাউন তালিকা (Font Selector Dropdown)
                </label>
                <div className="relative">
                  <select
                    id="bengali-font-select"
                    value={data.fontFamily === 'serif' ? 'noto-serif' : data.fontFamily}
                    onChange={(e) => updateField('fontFamily', e.target.value as LetterData['fontFamily'])}
                    className="w-full appearance-none bg-white border-2 border-neutral-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-900 shadow-xs transition-all cursor-pointer pr-10"
                  >
                    {BENGALI_FONTS.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.nameBn} ({font.nameEn}) — {font.categoryBn}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* 2. Interactive Live Sample Preview Cards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    সকল ফন্টের নমুনা দর্শন ও সরাসরি নির্বাচন (Font Gallery Preview)
                  </label>
                  <span className="text-[10px] text-neutral-400 font-medium">১২টি ফন্ট উপলব্ধ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {BENGALI_FONTS.map((font) => {
                    const isSelected = data.fontFamily === font.id || (data.fontFamily === 'serif' && font.id === 'noto-serif');
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => updateField('fontFamily', font.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/90 shadow-md ring-2 ring-amber-500/30'
                            : 'border-neutral-200 bg-white hover:border-amber-300 hover:bg-neutral-50/80'
                        }`}
                      >
                        {/* Header: Name and Category badge */}
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                              <span>{font.nameBn}</span>
                              <span className="text-[10px] text-neutral-400 font-normal">({font.nameEn})</span>
                            </div>
                            <div className="text-[10px] text-amber-800/80 font-medium">
                              {font.categoryBn}
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Visual Sample in that Font */}
                        <div 
                          className={`text-sm sm:text-base text-neutral-800 py-1 px-2 rounded-lg bg-neutral-50/80 border border-neutral-200/50 ${font.cssClass}`}
                          style={{ fontFamily: font.cssFamily }}
                        >
                          {font.sampleText}
                        </div>

                        {/* Short Description */}
                        <div className="text-[10px] text-neutral-500 line-clamp-1">
                          {font.descBn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: TEMPLATES ================= */}
        {activeTab === 'templates' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-xs text-neutral-500">
              নিচের যেকোনো প্রস্তুত চিঠি নির্বাচন করে এক ক্লিকেই সম্পূর্ণ চিঠি পরিবর্তন করতে পারেন:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-amber-50/40 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="font-bold text-sm text-neutral-900">{tmpl.name}</div>
                    <div className="text-xs text-neutral-600 mt-1">{tmpl.description}</div>
                  </div>
                  <button
                    onClick={() => applyTemplate(tmpl.data)}
                    className="mt-3 py-1.5 px-3 bg-white hover:bg-amber-600 hover:text-white border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>এই নমুনা ব্যবহার করুন</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Footer Action Bar */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            id="reset-original-btn"
            onClick={onReset}
            className="text-neutral-500 hover:text-amber-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            title="নমুনা চিঠি দিয়ে পূর্ণ করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>নমুনা চিঠি</span>
          </button>

          {onClearAllText && (
            <button
              id="clear-all-text-btn"
              onClick={() => {
                if (window.confirm('আপনি কি নিশ্চিত যে ওয়েবসাইট থেকে আপনার এই ব্যক্তিগত চিঠি সম্পূর্ণ মুছে ফেলতে চান? এতে ব্রাউজার মেমোরি থেকে আপনার লেখা মুছে যাবে।')) {
                  onClearAllText();
                }
              }}
              className="text-neutral-500 hover:text-red-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="ওয়েবসাইট থেকে সব লেখা মুছে ফেলুন"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              <span>চিঠির লেখা মুছুন (গোপনীয়তা)</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            id="friend-view-toggle-bottom-btn"
            onClick={onEnterFriendPreview}
            className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>প্রিভিউ</span>
          </button>

          <button
            id="export-action-bottom-btn"
            onClick={onOpenExportModal}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>ইমেইল / ডাউনলোড / শেয়ার</span>
          </button>
        </div>
      </div>
    </div>
  );
};

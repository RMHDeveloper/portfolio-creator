
import React, { useState } from 'react';
import { Question, QuestionType } from '../types';
import ImageCropModal from './ImageCropModal';
// Removed import for optimizeBusinessPhrasing

interface QuestionRendererProps {
  question: Question;
  value: string;
  onChange: (val: string) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, value, onChange }) => {
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  // Removed optimization and loading states

  // Removed handleOptimize function

  if (question.type === QuestionType.IMAGE) {
    return (
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="w-32 h-32 rounded-full border-2 border-slate-100 overflow-hidden bg-slate-50 shadow-inner relative group">
          {value ? (
            <img src={value} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <label className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-center cursor-pointer hover:border-rose-600 transition-all shadow-sm">
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Select Headshot</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPendingImage(reader.result as string);
                reader.readAsDataURL(file);
              }
              e.target.value = '';
            }}
            className="hidden"
          />
        </label>

        {pendingImage && (
          <ImageCropModal
            imageSrc={pendingImage}
            onCancel={() => setPendingImage(null)}
            onSave={(croppedDataUrl) => {
              onChange(croppedDataUrl);
              setPendingImage(null);
            }}
          />
        )}
      </div>
    );
  }

  if (question.type === QuestionType.LIST) {
    const entries = value ? value.split('\n') : [];
    const maxEntries = question.maxEntries || 4;
    const items = Array.from({ length: maxEntries }).map((_, i) => entries[i] || '');

    const handleItemChange = (index: number, newVal: string) => {
      const newItems = [...items];
      newItems[index] = newVal;
      onChange(newItems.join('\n').trim());
    };

    return (
      <div className="w-full space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 group">
            <span className="text-xl font-black text-slate-200 italic w-8 text-right group-focus-within:text-rose-600 transition-colors leading-none">
              {idx + 1}.
            </span>
            <div className="flex-grow bg-slate-50 border border-slate-200 group-focus-within:border-rose-600 group-focus-within:bg-white transition-all px-4 py-3 flex items-center rounded-xl">
              <input
                type="text"
                placeholder={question.placeholder || "Enter details..."}
                className="bg-transparent w-full text-sm text-slate-900 font-bold focus:outline-none placeholder:text-slate-300"
                value={item}
                onChange={(e) => handleItemChange(idx, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          placeholder={question.placeholder}
          className="w-full bg-slate-50 border border-slate-200 focus:border-rose-600 focus:bg-white focus:outline-none p-5 text-sm font-bold text-slate-900 min-h-[100px] rounded-xl transition-all placeholder:text-slate-300 resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* Removed AI Upgrade button and optimization display */}
      </div>
    </div>
  );
};

export default QuestionRenderer;
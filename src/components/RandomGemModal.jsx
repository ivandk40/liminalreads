import React from 'react';
import { X, Shuffle, ExternalLink, BookOpen, Star } from 'lucide-react';

export default function RandomGemModal({ gem, onShuffle, onClose, onReadStory }) {
  if (!gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-[#111111] rounded shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#111111] pb-3 mb-5">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#888888]">
            Random Draw • Internet Archive
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0f0f0] text-[#555555]">
              {gem.category}
            </span>
            <span className="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0f0f0] text-[#555555]">
              {gem.type}
            </span>
            {gem.isStaffPick && (
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#111111] font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#111111]" /> Pick
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl font-normal text-[#111111] leading-snug">
            {gem.title}
          </h3>

          {gem.author && (
            <p className="font-sans text-xs uppercase tracking-wider text-[#666666]">
              By <span className="text-[#111111] font-medium">{gem.author}</span>
            </p>
          )}

          {gem.description && (
            <p className="font-serif text-sm text-[#444444] leading-relaxed pt-2 italic border-l-2 border-[#111111] pl-3">
              “{gem.description}”
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-[#e5e5e5]">
          <button
            onClick={onShuffle}
            className="px-3.5 py-1.5 rounded border border-[#cccccc] hover:border-[#111111] text-[#333333] hover:text-[#111111] text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Spin Again
          </button>

          <div className="flex items-center gap-2">
            {gem.paragraphs && gem.paragraphs.length > 0 && (
              <button
                onClick={() => {
                  onClose();
                  onReadStory(gem);
                }}
                className="px-4 py-1.5 rounded bg-[#111111] hover:bg-black text-white text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Read Story
              </button>
            )}

            {gem.url && (
              <a
                href={gem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <span>Visit ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

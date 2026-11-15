import React, { useEffect } from 'react';
import { X, ExternalLink, Clock, Share2 } from 'lucide-react';

export default function StoryReaderModal({ story, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!story) return null;

  const copyStory = () => {
    const fullText = `${story.title}\n${story.author ? `By ${story.author}\n` : ''}\n${story.paragraphs.join('\n\n')}`;
    navigator.clipboard.writeText(fullText);
    alert('Copied story text to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white border border-[#111111] rounded shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Masthead of Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#777777]">
              {story.category}
            </span>
            <span className="text-[#cccccc]">•</span>
            <span className="flex items-center gap-1 font-sans text-xs text-[#777777]">
              <Clock className="w-3.5 h-3.5" />
              {story.readingTime || 'Archive Read'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyStory}
              className="p-1.5 text-[#666666] hover:text-[#111111] transition-colors"
              title="Copy story text"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#666666] hover:text-[#111111] transition-colors"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-14 py-10 space-y-6">
          <div className="border-b border-[#111111] pb-6 space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl text-[#111111] leading-tight font-normal">
              {story.title}
            </h1>
            {story.author && (
              <p className="font-sans text-xs uppercase tracking-widest text-[#666666]">
                By <span className="text-[#111111] font-semibold">{story.author}</span>
              </p>
            )}
            {story.url && (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-sans text-[#666666] hover:text-[#111111] hover:underline pt-1"
              >
                <span>Original source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="font-serif text-lg leading-relaxed text-[#222222] space-y-5">
            {story.paragraphs && story.paragraphs.length > 0 ? (
              story.paragraphs.map((p, idx) => (
                <p key={idx} className="whitespace-pre-line first-letter:text-3xl first-letter:font-display first-letter:float-left first-letter:mr-2">
                  {p}
                </p>
              ))
            ) : (
              <p className="italic text-[#666666]">{story.description}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#e5e5e5] bg-[#fafafa] flex items-center justify-between font-sans text-xs text-[#777777]">
          <span>Compendious Amusements</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-wider rounded font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

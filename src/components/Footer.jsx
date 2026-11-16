import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#111111] bg-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1 text-xs font-serif text-[#777777]">
          <span className="italic">Made by Ivan with ❤️</span>
          <span className="text-[#cccccc]">•</span>
          <span>
            Contact:{' '}
            <a 
              href="mailto:ivan@liminalreads.com" 
              className="text-[#111111] hover:underline underline-offset-2 font-sans text-[11px]"
            >
              ivan@liminalreads.com
            </a>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-[#555555]">
          <span className="hidden sm:inline text-[#888888]">Liminal Reads Archive</span>
          <span className="hidden sm:inline text-[#cccccc]">•</span>
          <button 
            onClick={scrollToTop}
            className="hover:text-[#111111] transition-colors p-1 flex items-center gap-1.5"
            title="Return to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

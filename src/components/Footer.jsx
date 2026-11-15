import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#111111] bg-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <p className="font-serif italic text-xs text-[#777777]">
          Made by Ivan with ❤️
        </p>

        <div className="flex items-center gap-5 text-xs font-sans uppercase tracking-widest text-[#555555]">
          <a
            href="https://idkloves.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors flex items-center gap-1.5"
            title="Visit Ivan's personal canon"
          >
            <span>Things I Love (idkloves.com)</span>
            <ExternalLink className="w-3 h-3 text-[#888888]" />
          </a>
          <span>•</span>
          <button 
            onClick={scrollToTop}
            className="hover:text-[#111111] transition-colors p-1"
            title="Return to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

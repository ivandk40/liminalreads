import React from 'react';
import { Search, Shuffle } from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenRandomGem,
  count
}) {
  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40 transition-colors">
      {/* Editorial Masthead */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
          Liminal Reads
        </h1>
        <p className="mt-1 font-serif text-xs sm:text-[13px] text-[#333333] tracking-wide">
          Curated curiosities from the far reaches of the internet
        </p>
        <p className="mt-1.5 font-serif italic text-[11px] sm:text-xs text-[#777777] max-w-2xl mx-auto leading-relaxed">
          Investigative journalism, aviation post-mortems, darknet dispatches, transfinite mathematics, bizarre true crime, eerie manga, and Reddit folklore.
        </p>
      </div>

      {/* Sub-bar: Search & Random Gem */}
      <div className="bg-[#fafafa] border-t border-[#f0f0f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${count} items...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 rounded bg-white border border-[#e5e5e5] text-xs font-sans text-[#111111] placeholder-[#888888] focus:outline-none focus:border-[#111111] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Random Gem Action */}
          <button
            onClick={onOpenRandomGem}
            className="px-3 py-1 rounded bg-white border border-[#e5e5e5] hover:border-[#111111] text-[#333333] hover:text-[#111111] text-xs font-sans flex items-center gap-1.5 transition-colors shadow-sm"
            title="Draw a random gem from the archive"
          >
            <Shuffle className="w-3 h-3 text-[#555555]" />
            <span>Random Gem</span>
          </button>

        </div>
      </div>
    </header>
  );
}

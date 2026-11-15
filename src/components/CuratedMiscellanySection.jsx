import React, { useState } from 'react';
import { ExternalLink, BookOpen, Star } from 'lucide-react';

export default function CuratedMiscellanySection({ 
  gems, 
  onSelectStory, 
  searchQuery
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Personal Favorites',
    'Essays',
    'The New Yorker',
    'Articles',
    'Aviation Disasters',
    'Sad, Creepy & Disturbing',
    'Museum of Reddit',
    'Sci-Fi, Philosophy & Mathematics',
    'Podcasts',
    'Webcomics',
    'Bizarre and Mystifying',
    'Music',
    'Miscellaneous'
  ];

  const filteredGems = gems.filter((gem) => {
    let matchesCat = true;
    if (selectedCategory === 'Personal Favorites') {
      matchesCat = gem.isStaffPick;
    } else if (selectedCategory !== 'All') {
      matchesCat = gem.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    let matchesSearch = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        gem.title.toLowerCase().includes(q) ||
        (gem.author && gem.author.toLowerCase().includes(q)) ||
        (gem.description && gem.description.toLowerCase().includes(q)) ||
        (gem.category && gem.category.toLowerCase().includes(q)) ||
        (gem.type && gem.type.toLowerCase().includes(q));
    }

    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      
      {/* Category Navigation (Cleanly Wrapped, No Horizontal Scrollbar) */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-[#e5e5e5] pb-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-sans uppercase tracking-wider">
          {categories.map((cat) => {
            const isFavorite = cat === 'Personal Favorites';
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 border-b-2 transition-all flex items-center gap-1 ${
                  selectedCategory === cat
                    ? 'border-[#111111] text-[#111111] font-semibold'
                    : 'border-transparent text-[#777777] hover:text-[#111111]'
                }`}
              >
                {isFavorite && <Star className="w-2.5 h-2.5 fill-[#111111] text-[#111111]" />}
                {cat}
              </button>
            );
          })}
        </div>
        <span className="font-sans text-[11px] text-[#888888] whitespace-nowrap self-end sm:self-center">
          {filteredGems.length} items
        </span>
      </div>

      {/* Dense List of Curated Gems */}
      {filteredGems.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-[#dddddd] rounded">
          <p className="font-serif italic text-sm text-[#666666]">No amusements found in this category.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredGems.map((gem, idx) => {
            const hasStory = gem.paragraphs && gem.paragraphs.length > 0;

            return (
              <article
                key={gem.id}
                className="py-3 sm:py-3.5 group hover:bg-[#fafafa] px-2 -mx-2 rounded transition-colors"
              >
                {/* Row 1: Title, Author, and Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <span className="font-sans text-[10px] text-[#999999] font-mono select-none w-5 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>

                    <h3 className="font-display text-base sm:text-lg text-[#111111] font-normal tracking-tight group-hover:underline underline-offset-2">
                      {gem.url ? (
                        <a 
                          href={gem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:opacity-80"
                        >
                          {gem.title}
                        </a>
                      ) : (
                        <span 
                          onClick={() => hasStory && onSelectStory(gem)}
                          className={hasStory ? 'cursor-pointer hover:opacity-80' : ''}
                        >
                          {gem.title}
                        </span>
                      )}
                    </h3>

                    {gem.author && (
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#777777]">
                        — {gem.author}
                      </span>
                    )}
                  </div>

                  {/* Right Badges & Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto text-[10px] font-sans">
                    {gem.isStaffPick && (
                      <span className="text-[#111111] font-semibold flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-[#111111]" /> Favorite
                      </span>
                    )}

                    <span className="text-[#888888] uppercase tracking-wider">
                      {gem.category}
                    </span>

                    {hasStory ? (
                      <button
                        onClick={() => onSelectStory(gem)}
                        className="ml-1 text-[#111111] font-medium hover:underline flex items-center gap-0.5 bg-[#f0f0f0] hover:bg-[#e4e4e4] px-1.5 py-0.5 rounded transition-colors"
                      >
                        <BookOpen className="w-2.5 h-2.5" />
                        <span>Story</span>
                      </button>
                    ) : gem.url ? (
                      <a
                        href={gem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-[#555555] hover:text-[#111111] flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-[#f0f0f0] transition-colors"
                        title="Open external source"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Row 2: Description (Compact) */}
                {gem.description && (
                  <p className="font-serif text-xs sm:text-[13px] text-[#555555] leading-snug line-clamp-2 mt-1 sm:pl-7">
                    {gem.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}

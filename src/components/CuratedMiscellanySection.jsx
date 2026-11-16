import React, { useState } from 'react';
import { ExternalLink, BookOpen, Star, ChevronDown, ChevronRight } from 'lucide-react';

export default function CuratedMiscellanySection({ 
  gems, 
  onSelectStory, 
  searchQuery
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openToggles, setOpenToggles] = useState({
    '8b61b43e-011a-470e-933f-bdc43dd06181': true, // Darknet Diaries open by default
    'casefile-true-crime': true, // Casefile open by default
    '99-percent-invisible': true // 99% Invisible open by default
  });

  const toggleItem = (id) => {
    setOpenToggles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    'All',
    'Personal Favorites',
    'Essays & Ideas',
    'Investigative & True Crime',
    'The New Yorker',
    'Aviation & Maritime Disasters',
    'Sci-Fi, Dark & Bizarre',
    'Reddit Lore',
    'Podcasts & Audio'
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
      const matchesEpisodes = gem.episodes && gem.episodes.some(ep => 
        ep.title.toLowerCase().includes(q) ||
        (ep.description && ep.description.toLowerCase().includes(q))
      );

      matchesSearch = 
        gem.title.toLowerCase().includes(q) ||
        (gem.author && gem.author.toLowerCase().includes(q)) ||
        (gem.description && gem.description.toLowerCase().includes(q)) ||
        (gem.category && gem.category.toLowerCase().includes(q)) ||
        (gem.type && gem.type.toLowerCase().includes(q)) ||
        matchesEpisodes;
    }

    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      
      {/* Category Navigation (Cleanly Wrapped, No Horizontal Scrollbar) */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-[#e5e5e5] pb-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-[11px] font-sans uppercase tracking-wider">
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
        <span className="font-sans text-xs sm:text-[11px] text-[#888888] whitespace-nowrap self-end sm:self-center">
          {filteredGems.length} items
        </span>
      </div>

      {/* Dense List of Curated Gems */}
      {filteredGems.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-[#dddddd] rounded">
          <p className="font-serif italic text-sm text-[#666666]">No curiosities found in this category.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#eeeeee]">
          {filteredGems.map((gem, idx) => {
            const hasStory = gem.paragraphs && gem.paragraphs.length > 0;
            const hasEpisodes = Boolean(gem.episodes && gem.episodes.length > 0);
            
            // Auto-expand toggle if searching matches child episode
            const queryMatchesChild = Boolean(
              searchQuery && hasEpisodes && gem.episodes.some(ep => 
                ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (ep.description && ep.description.toLowerCase().includes(searchQuery.toLowerCase()))
              )
            );
            const isOpen = Boolean(openToggles[gem.id] || queryMatchesChild);

            return (
              <article
                key={gem.id}
                className="py-3 sm:py-3.5 group hover:bg-[#fafafa] px-2 -mx-2 rounded transition-colors"
              >
                {/* Row 1: Title, Author, and Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <span className="font-sans text-[11px] sm:text-[10px] text-[#999999] font-mono select-none w-5 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>

                    <h3 className="font-display text-[17px] sm:text-lg text-[#111111] font-normal tracking-tight group-hover:underline underline-offset-2">
                      {hasEpisodes ? (
                        <button
                          onClick={() => toggleItem(gem.id)}
                          className="text-left font-display text-[17px] sm:text-lg text-[#111111] font-normal tracking-tight hover:opacity-80 inline-flex items-center gap-1.5"
                        >
                          <span>{gem.title}</span>
                        </button>
                      ) : gem.url ? (
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
                      <span className="font-sans text-xs sm:text-[11px] uppercase tracking-wider text-[#777777]">
                        — {gem.author}
                      </span>
                    )}

                    {hasEpisodes && (
                      <button
                        onClick={() => toggleItem(gem.id)}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-[10px] font-sans font-medium text-[#444444] bg-[#f0f0f0] hover:bg-[#e4e4e4] px-1.5 py-0.5 rounded transition-colors"
                        title={isOpen ? "Collapse list" : "Expand list"}
                      >
                        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        <span>{gem.episodes.length} episodes</span>
                      </button>
                    )}

                    {!hasEpisodes && gem.seriesInfo && (
                      <span className="inline-flex items-center text-[11px] sm:text-[10px] font-sans font-medium text-[#555555] bg-[#f3f3f3] px-1.5 py-0.5 rounded">
                        {gem.seriesInfo}
                      </span>
                    )}
                  </div>

                  {/* Right Badges & Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto text-[11px] sm:text-[10px] font-sans">
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

                {/* Row 2: Description */}
                {gem.description && (
                  <p className="font-serif text-sm sm:text-[13px] text-[#555555] leading-relaxed sm:leading-snug line-clamp-3 sm:line-clamp-2 mt-1 sm:pl-7">
                    {gem.description}
                  </p>
                )}

                {/* Nested Toggle List for Episodes */}
                {hasEpisodes && isOpen && (
                  <div className="mt-3 sm:ml-7 pl-4 border-l-2 border-[#111111] divide-y divide-[#f0f0f0] animate-in fade-in duration-200">
                    {gem.episodes.map((ep, epIdx) => (
                      <div 
                        key={ep.id || epIdx} 
                        className="group/ep flex items-baseline justify-between gap-4 py-2 hover:bg-[#fafafa] px-2 -mx-2 rounded transition-colors"
                      >
                        <div className="min-w-0 flex-1 leading-snug">
                          <a
                            href={ep.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-[15px] sm:text-[15px] text-[#111111] hover:underline font-normal tracking-tight"
                          >
                            {ep.title}
                          </a>
                          {ep.description && (
                            <span className="font-serif text-sm sm:text-[13px] text-[#555555]">
                              {' '}— {ep.description}
                            </span>
                          )}
                        </div>

                        <a
                          href={ep.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] sm:text-[10px] font-sans text-[#888888] group-hover/ep:text-[#111111] uppercase tracking-wider flex items-center gap-1 flex-shrink-0 transition-colors"
                        >
                          <span>Listen</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}

import React, { useState } from 'react';

export default function ThingsILoveSection({ things = [], searchQuery = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = things.length > 0 ? ['All', ...new Set(things.map(t => t.category))] : [];

  const filteredThings = things.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-6 animate-in fade-in duration-300">
      
      {/* Editorial Header (Compact) */}
      <div className="border-b border-[#111111] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#888888]">
            Section II
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#111111] tracking-tight">
            Things I Love
          </h2>
        </div>
      </div>

      {/* When blank: quiet minimalist placeholder */}
      {things.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif italic text-base text-[#777777]">
            Currently unwritten.
          </p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-widest text-[#aaaaaa]">
            A personal canon in progress
          </p>
        </div>
      ) : (
        <>
          {/* Category Navigation (Cleanly Wrapped, No Horizontal Scrollbar) */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#e5e5e5] pb-2.5 text-[11px] font-sans uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`pb-1 border-b-2 transition-all ${
                    selectedCategory === cat
                      ? 'border-[#111111] text-[#111111] font-semibold'
                      : 'border-transparent text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  {cat} {cat === 'All' ? `(${things.length})` : ''}
                </button>
              ))}
            </div>
          )}

          {/* Dense List of items */}
          <div className="divide-y divide-[#eeeeee]">
            {filteredThings.map((item, idx) => (
              <article
                key={item.id || idx}
                className="py-3 sm:py-3.5 group hover:bg-[#fafafa] px-2 -mx-2 rounded transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <span className="font-sans text-[10px] text-[#999999] font-mono select-none w-5 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <h3 className="font-display text-base sm:text-lg text-[#111111] font-normal tracking-tight">
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#777777]">
                        — {item.category}
                      </span>
                    )}
                  </div>

                  {item.tag && (
                    <span className="text-[10px] font-sans uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f3f3f3] text-[#555555]">
                      {item.tag}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="font-serif text-xs sm:text-[13px] text-[#555555] leading-snug line-clamp-2 mt-1 sm:pl-7">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </>
      )}

    </section>
  );
}

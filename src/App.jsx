import React, { useState } from 'react';
import Header from './components/Header';
import CuratedMiscellanySection from './components/CuratedMiscellanySection';
import StoryReaderModal from './components/StoryReaderModal';
import RandomGemModal from './components/RandomGemModal';
import Footer from './components/Footer';

import gemsData from './data/curatedGems.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gems] = useState(gemsData);

  // Modals
  const [selectedStory, setSelectedStory] = useState(null);
  const [randomGem, setRandomGem] = useState(null);

  const handleOpenRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  const handleShuffleRandomGem = () => {
    const randomIndex = Math.floor(Math.random() * gems.length);
    setRandomGem(gems[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenRandomGem={handleOpenRandomGem}
        count={gems.length}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <CuratedMiscellanySection
          gems={gems}
          onSelectStory={(story) => setSelectedStory(story)}
          searchQuery={searchQuery}
        />
      </main>

      <Footer />

      {selectedStory && (
        <StoryReaderModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {randomGem && (
        <RandomGemModal
          gem={randomGem}
          onShuffle={handleShuffleRandomGem}
          onClose={() => setRandomGem(null)}
          onReadStory={(story) => setSelectedStory(story)}
        />
      )}
    </div>
  );
}

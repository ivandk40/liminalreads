import React, { useState } from 'react';
import { X, Plus, Download } from 'lucide-react';

export default function AddThingModal({ onAdd, onClose, allThings }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Everyday Carry');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [whyLove, setWhyLove] = useState('');
  const [favoriteDetail, setFavoriteDetail] = useState('');
  const [rating, setRating] = useState('Essential');

  const categories = [
    'Rituals & Coffee',
    'Everyday Carry',
    'Books & Words',
    'Tech & Craft',
    'Objects & Wear',
    'Atmosphere & Nature',
    'Sounds & Audio',
    'Mindsets & Philosophy',
    'Food & Gastronomy'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newThing = {
      id: `til-${Date.now()}`,
      title: title.trim(),
      category,
      tag: tag.trim() || 'Favorite',
      description: description.trim(),
      whyLove: whyLove.trim(),
      favoriteDetail: favoriteDetail.trim(),
      rating
    };

    onAdd(newThing);
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allThings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "thingsILove.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-[#111111] rounded shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#111111] pb-3 mb-6">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#888888] block mb-1">
            Personal Canon
          </span>
          <h2 className="font-display text-2xl font-normal text-[#111111]">
            Add to Things I Love
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
          <div>
            <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
              Title / Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chemex 6-cup pour over, Leica M6, 'Invisible Cities'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
                Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Daily Ritual, Analog, Grail"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Sensory, historical, or physical details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
              Why I Love It
            </label>
            <input
              type="text"
              placeholder="e.g. It turns chaotic mornings into an intentional, slow meditation."
              value={whyLove}
              onChange={(e) => setWhyLove(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
                Favorite Nuance
              </label>
              <input
                type="text"
                placeholder="e.g. The brass patina after 6 months."
                value={favoriteDetail}
                onChange={(e) => setFavoriteDetail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[11px] font-medium text-[#444444] mb-1">
                Rating / Tier
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white border border-[#cccccc] text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Essential">Essential</option>
                <option value="Daily Driver">Daily Driver</option>
                <option value="All-Time">All-Time</option>
                <option value="Grail">Grail</option>
                <option value="Heirloom">Heirloom</option>
                <option value="Soul Food">Soul Food</option>
                <option value="Timeless">Timeless</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#e5e5e5]">
            <button
              type="button"
              onClick={handleExportJSON}
              className="text-xs text-[#777777] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded border border-[#cccccc] text-[#555555] hover:text-[#111111] text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#111111] hover:bg-black text-white text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Save Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

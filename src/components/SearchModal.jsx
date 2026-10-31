import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchLessons } from '../lib/assistantSearch';
import { modules } from '../data/modules';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts (Esc, Arrows, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, onClose]); // Note: results needs to be in closure, handled below via ref or memo

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
      listRef.current.children[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Compute results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const out = [];

    // 1. Search Modules
    modules.forEach((m) => {
      if (m.status !== 'available') return;
      if (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      ) {
        out.push({
          id: `mod-${m.id}`,
          type: 'module',
          title: m.title,
          subtitle: m.description,
          icon: m.icon,
          path: `/module/${m.id}`,
        });
      }
    });

    // 2. Search Lessons
    const lessonResults = searchLessons(q, 10);
    lessonResults.forEach((r) => {
      const mod = modules.find((m) => m.id === r.moduleId);
      out.push({
        id: `les-${r.moduleId}-${r.lessonId}`,
        type: 'lesson',
        title: r.title,
        subtitle: `${mod?.title} · ${r.snippet}`,
        icon: mod?.icon || '📖',
        path: `/module/${r.moduleId}/lesson/${r.lessonId}`,
      });
    });

    return out.slice(0, 12); // Max 12 results
  }, [query]);

  const handleSelect = (item) => {
    if (!item) return;
    navigate(item.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-surface-700 bg-surface-900 shadow-2xl animate-slide-down">
        {/* Input Area */}
        <div className="flex items-center border-b border-surface-800 px-4 py-3">
          <span className="text-xl text-surface-600">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search modules, lessons, concepts..."
            className="w-full bg-transparent px-3 py-2 text-lg text-white placeholder:text-surface-600 outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-md border border-surface-700 px-2 py-1 text-xs text-surface-600 hover:bg-surface-800"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2" ref={listRef}>
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-surface-600">
              {query.trim().length > 0
                ? 'No results found. Try a different keyword.'
                : 'Type to start searching...'}
            </div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  i === selectedIndex
                    ? 'bg-brand-500/15'
                    : 'hover:bg-surface-800/50'
                }`}
              >
                <span className="mt-0.5 text-2xl">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold text-white">
                      {item.title}
                    </span>
                    <span
                      className={`rounded-md border px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                        item.type === 'module'
                          ? 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                          : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-surface-600">
                    {item.subtitle}
                  </div>
                </div>
                {i === selectedIndex && (
                  <span className="text-[10px] text-surface-600 mt-1">↵</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-surface-800 bg-surface-950/50 px-4 py-2 flex items-center justify-between text-[10px] text-surface-600">
          <div className="flex gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>PyMastery Global Search</span>
        </div>
      </div>
    </div>
  );
}
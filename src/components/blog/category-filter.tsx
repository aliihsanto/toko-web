'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  categoryLabels: Record<string, string>;
  allLabel: string;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  categoryLabels,
  allLabel,
  onCategoryChange,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleClick(category: string | null) {
    setActiveCategory(category);
    onCategoryChange(category);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => handleClick(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          activeCategory === null
            ? 'bg-primary text-white'
            : 'bg-muted text-foreground hover:bg-primary/10'
        }`}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => handleClick(category)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === category
              ? 'bg-primary text-white'
              : 'bg-muted text-foreground hover:bg-primary/10'
          }`}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function FeaturedBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-sm ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
      <span>Featured</span>
    </span>
  );
}

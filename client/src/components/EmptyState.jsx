import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset, hasFilters = false }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">
        No businesses found
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        We couldn't find any Coimbatore businesses matching your search criteria. Try adjusting your keywords, category, or location filter.
      </p>

      {hasFilters && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-brand-600 hover:bg-brand-700 active:scale-95 transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );
}

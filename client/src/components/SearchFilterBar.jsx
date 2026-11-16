import React from 'react';
import { Search, X, Filter, RotateCcw, MapPin, Tag } from 'lucide-react';

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  onClearFilters,
  categories = [],
  locations = [],
  totalCount = 0,
  loading = false,
}) {
  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    (selectedCategory && selectedCategory !== 'all') ||
    (selectedLocation && selectedLocation !== 'all')
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
      {/* Top Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Search Input (Takes 5 cols on md+) */}
        <div className="relative md:col-span-5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search businesses by name..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Select (Takes 3 cols on md+) */}
        <div className="relative md:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Tag className="w-4 h-4" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Location Select (Takes 3 cols on md+) */}
        <div className="relative md:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Locations (Coimbatore)</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button (Takes 1 col on md+) */}
        <div className="md:col-span-1 flex items-center">
          <button
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className={`w-full h-[42px] rounded-xl flex items-center justify-center transition-all ${
              hasActiveFilters
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
                : 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400'
            }`}
            title="Clear all active filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Status Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>
            {loading ? (
              'Searching Coimbatore directory...'
            ) : (
              <>
                Found <strong className="text-slate-800">{totalCount}</strong>{' '}
                {totalCount === 1 ? 'business' : 'businesses'}
              </>
            )}
          </span>

          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">
              Filtered
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-brand-600 hover:text-brand-800 font-semibold underline underline-offset-2"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}

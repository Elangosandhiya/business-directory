import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useBusinesses } from '../hooks/useBusinesses';
import { getCategories, getLocations } from '../services/businessService';
import SearchFilterBar from '../components/SearchFilterBar';
import BusinessGrid from '../components/BusinessGrid';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../utils/constants';

export default function BusinessListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL params
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialLocation = searchParams.get('location') || 'all';
  const initialPage = parseInt(searchParams.get('page'), 10) || DEFAULT_PAGE;

  // Local state for immediate input feedback
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [page, setPage] = useState(initialPage);

  // Available dropdown options
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Debounce search input by 300ms
  const debouncedSearch = useDebounce(searchInput, 300);

  // Fetch filter dropdown options on mount
  useEffect(() => {
    let isMounted = true;
    const fetchOptions = async () => {
      try {
        const [cats, locs] = await Promise.all([getCategories(), getLocations()]);
        if (isMounted) {
          setCategories(cats);
          setLocations(locs);
        }
      } catch (err) {
        console.error('Failed to load filter choices:', err);
      }
    };
    fetchOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state changes to URL search params
  useEffect(() => {
    const params = {};
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (category && category !== 'all') params.category = category;
    if (location && location !== 'all') params.location = location;
    if (page > 1) params.page = page.toString();

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, category, location, page, setSearchParams]);

  // Reset to page 1 whenever search, category, or location filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, location]);

  // Fetch businesses data using custom hook
  const { data, pagination, loading, error, refetch } = useBusinesses({
    search: debouncedSearch,
    category,
    location,
    page,
    limit: DEFAULT_LIMIT,
  });

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchInput('');
    setCategory('all');
    setLocation('all');
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <section className="mb-8 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-3 border border-brand-200/60">
          Coimbatore Smart Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Explore Trusted Businesses in Coimbatore
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Discover vetted traditional restaurants, healthcare centers, IT studios, textile boutiques, and local services across Kongunadu.
        </p>
      </section>

      {/* Search & Filter Toolbar */}
      <SearchFilterBar
        searchTerm={searchInput}
        onSearchChange={setSearchInput}
        selectedCategory={category}
        onCategoryChange={setCategory}
        selectedLocation={location}
        onLocationChange={setLocation}
        onClearFilters={handleResetFilters}
        categories={categories}
        locations={locations}
        totalCount={pagination.total}
        loading={loading}
      />

      {/* Content Section */}
      {error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <EmptyState
          onReset={handleResetFilters}
          hasFilters={Boolean(searchInput || category !== 'all' || location !== 'all')}
        />
      ) : (
        <>
          <BusinessGrid businesses={data} />
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            pageSize={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

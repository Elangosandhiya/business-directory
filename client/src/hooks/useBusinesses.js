import { useState, useEffect, useCallback, useRef } from 'react';
import { getBusinesses } from '../services/businessService';

/**
 * Custom hook to fetch businesses with AbortController cancellation,
 * loading state, error handling, and pagination.
 */
export function useBusinesses({ search, category, location, page, limit }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep a ref to the current active AbortController
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await getBusinesses(
        { search, category, location, page, limit },
        controller.signal
      );

      setData(response.data || []);
      setPagination(
        response.pagination || {
          page: 1,
          limit: 9,
          total: response.data?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      // Do not treat aborted requests as errors
      if (err.isCancelled || err.name === 'CanceledError' || err.name === 'AbortError') {
        return;
      }
      setError(err.message || 'Failed to fetch businesses. Please try again.');
    } finally {
      // Only set loading to false if this controller wasn't replaced
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [search, category, location, page, limit]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch: fetchData,
  };
}

import api from './api';

export const getBusinesses = async (params = {}, signal) => {
  const cleanParams = {};
  if (params.search && params.search.trim()) cleanParams.search = params.search.trim();
  if (params.category && params.category !== 'all') cleanParams.category = params.category;
  if (params.location && params.location !== 'all') cleanParams.location = params.location;
  if (params.page) cleanParams.page = params.page;
  if (params.limit) cleanParams.limit = params.limit;

  const response = await api.get('/businesses', {
    params: cleanParams,
    signal,
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data?.data || [];
};

export const getLocations = async () => {
  const response = await api.get('/locations');
  return response.data?.data || [];
};

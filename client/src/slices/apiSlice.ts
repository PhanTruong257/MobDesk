import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage or state
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

// Wrapper with token refresh logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Try to refresh token
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/api/v1/auth/refresh',
          method: 'POST',
          body: { refreshToken }
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const { accessToken } = refreshResult.data as any;
        localStorage.setItem('accessToken', accessToken);
        
        // Retry original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Product', 'Category', 'Brand', 'Order', 'Review'],
  endpoints: builder => ({})
});
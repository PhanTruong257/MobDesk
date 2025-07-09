import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),

    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    updateProfile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    refreshToken: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/refresh-token`,
        method: 'POST',
        body: data
      })
    }),

    // Admin endpoints
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${USERS_URL}?page=${page}&limit=${limit}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),

    // Password reset endpoints
    requestPasswordReset: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data
      })
    }),

    resetPassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useLoginMutation,
 
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation
} = usersApiSlice;
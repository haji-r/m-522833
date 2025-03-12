import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/v1";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {  
      // If we have a token set in state, let's assume that we should be passing it.

      const localAccessToken = localStorage.getItem('accessToken');
      console.log("HELLO", localAccessToken)
      if (localAccessToken) {
        headers.set('authorization', `Bearer ${localAccessToken}`)
      }
      return headers
    },

  }),

  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => {
        return response;
      }
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
    signInUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: "POST",
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: user
      }),
      transformResponse: (response) => {
        console.log(response)
        return response;
      }
    }),
    fetchMe: builder.query({
      query: () => '/users/me',
      transformResponse: (response) => {
        return response;
      }
    })
  }),
});

export const { useLazyFetchUserQuery, useCreateUserMutation, useSignInUserMutation, useLazyFetchMeQuery } = usersApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const threadsApi = createApi({
  reducerPath: 'threadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,

    prepareHeaders: (headers) => {  
      // If we have a token set in state, let's assume that we should be passing it.

      const localAccessToken = localStorage.getItem('accessToken');
      if (localAccessToken) {
        headers.set('authorization', `Bearer ${localAccessToken}`)
      }
      return headers
    },

  }),
  endpoints: (builder) => ({
    fetchThreads: builder.query({
      query: (params) => ({
        url: '/messages',
        params: params
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
    fetchThread: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
    createThread: builder.mutation({
      query: (params) => ({
        url: '/messages',
        method: "POST",
        body: params,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
  }),
});

export const { useLazyFetchThreadsQuery, useLazyFetchThreadQuery, useCreateThreadMutation } = threadsApi;
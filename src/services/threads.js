import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/v1";

export const threadsApi = createApi({
  reducerPath: 'threadsApi',
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
    fetchThreads: builder.query({
      query: (params) => ({
        url: '/messages',
        params: params
      }),
      transformResponse: (response) => {
        console.log(response)
        return response;
      }
    }),
    fetchThread: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
      }),
      transformResponse: (response) => {
        console.log(response)
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
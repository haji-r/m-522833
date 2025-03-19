import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "react-dotenv";

export const chatsApi = createApi({
  reducerPath: 'chatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    prepareHeaders: (headers) => {  
      // If we have a token set in state, let's assume that we should be passing it.
      const localAccessToken = localStorage.getItem('accessToken');
      if (localAccessToken) {
        headers.set('authorization', `Bearer ${localAccessToken}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    fetchChat: builder.query({
      query: (id) => `/chats/${id}`,
      transformResponse: (response) => {
        return response;
      }
    }),
    fetchChats: builder.query({
      query: (params) => ({
        url: '/chats',
        params: params,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
    createChat: builder.mutation({
      query: (params) => ({
        url: '/chats',
        method: "POST",
        body: params,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
    updateChat: builder.mutation({
      query: (params) => ({
        url: `/chats/${params.id}`,
        method: "PATCH",
        body: params.body,
      }),
      transformResponse: (response) => {
        return response;
      }
    }),
  }),
});

export const { useLazyFetchChatQuery, useLazyFetchChatsQuery, useCreateChatMutation, useUpdateChatMutation } = chatsApi;
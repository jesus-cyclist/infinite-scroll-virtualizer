import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TPost } from '../model'

type TGetPostsQuery = {
  page: number
  limit: number
}

type TGetPostsResponse = {
  response: Array<TPost>
  totalCount: number
}

export const postApi = createApi({
  reducerPath: 'postList',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<TGetPostsResponse, TGetPostsQuery>({
      query: ({ page, limit }) =>
        `posts?${page && `_page=${page}`}&${limit && `_limit=${limit}`}`,

      transformResponse: (response: any, meta: any) => {
        const totalCount = meta?.response?.headers.get('x-total-count')

        return { response: response, totalCount: +totalCount }
      },
    }),

    getPost: builder.query<TPost, string>({
      query: (id) => `posts/${id}`,
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery } = postApi

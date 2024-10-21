import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from 'services/base'

interface Post {
  id: number
  title: string
  body: string
}

/**
 * Creates an API instance using Redux Toolkit's createApi function.
 * The API instance includes endpoints for fetching posts and a specific post by ID.
 */

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQuery,
  tagTypes: ['Post'],
  keepUnusedDataFor: 5,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
// import { Post } from 'models/post'
import { createApi } from '@reduxjs/toolkit/query/react'

interface Post {
  id: number
  title: string
  body: string
}
import { CATCH_TIME_SECONDS } from 'constants/time'
import { customBaseQuery } from 'services/base'

/**
 * Creates an API instance using Redux Toolkit's createApi function.
 * The API instance includes endpoints for fetching posts and a specific post by ID.
 */

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Post'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
    }),
  }),
})

export const { useGetPostsQuery } = postsApi

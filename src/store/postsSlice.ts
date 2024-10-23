import { Post } from 'models/post'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postsApi } from 'services/api'

interface PostsState {
  postsList: Post[]
}

const initialState: PostsState = {
  postsList: [],
}

const postsSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(postsApi.endpoints.getPosts.matchFulfilled, (state, action: PayloadAction<Post[]>) => {
      state.postsList = action.payload // Store API data into state
    })
  },
})

// Action creators are generated for each case reducer function
export const { resetState } = postsSlice.actions

export default postsSlice.reducer

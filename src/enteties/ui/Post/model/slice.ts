import { createSlice } from '@reduxjs/toolkit'
import { TPost } from './types'

type TInitialState = {
  posts: Array<TPost>
}

const initialState: TInitialState = {
  posts: [],
}
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload]
    },
  },
})

export const postsAction = postSlice.actions

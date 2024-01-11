import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app'

const getPosts = (state: RootState) => state.post
export const selectPosts = createSelector(
  getPosts,
  (initialState) => initialState.posts
)

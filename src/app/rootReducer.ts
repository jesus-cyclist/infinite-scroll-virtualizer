import { combineReducers } from '@reduxjs/toolkit'
import { postApi } from 'enteties'
import { postSlice as postReducer } from '../enteties/ui/Post/model/slice'

export const rootReducer = combineReducers({
  post: postReducer.reducer,
  [postApi.reducerPath]: postApi.reducer,
})

import * as types from '../constants/actionTypes.js'

//action that takes in string from input box to update state
export const setSearch = (input) => ({
  type: types.SET_NEW_SEARCH,
  payload: input,
})

//actions that takes a boolean to conditionally render user feedback or results
export const setSearching = (input) => ({
  type: types.SET_SEARCHING,
  payload: input
})
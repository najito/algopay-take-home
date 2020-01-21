import * as types from '../constants/actionTypes.js';

//initializing state with starting values
const initialState = {
  search: '',
  searching: false,
}

// creating a reducer that begins with initial state values and takes in actions to alter state
const libraryReducer = (state = initialState, action) => {
  //switch statement to determine results based on action that comes in
  switch(action.type) {
    //if SET_NEW_SEARCH is used, state for search(a string) is altered
    case types.SET_NEW_SEARCH:
      let search = action.payload;
      return {
        ...state,
        search,
      }
      //if SET_SEARCHING is used, boolean is passed in and state is updated
    case types.SET_SEARCHING:
      let searching = action.payload;
      return {
        ...state,
        searching,
      }
      //otherwise maintain state
    default:
      return state;
  }
}

export default libraryReducer;
import { combineReducers } from 'redux';
import libraryReducer from './libraryReducer.js'

//combine reducers if multiple were used but here there is only one
const reducers = combineReducers({
  library: libraryReducer
})

export default reducers;
import { combineReducers } from 'redux-immutable'
import routing from './routing'
import home from './home' // default home reducers

export const reducers = combineReducers({
  routing,
  home
})

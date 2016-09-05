import { combineReducers } from 'redux-immutable'
import routing from './routing'
import * as home from './home'

export const reducers = combineReducers({
  routing,
  permission: home.permission
});

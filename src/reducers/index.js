import { combineReducers } from 'redux-immutable'
import routing from './routing'

export default combineReducers({
  routing,
  permission: (state, action) => {
    switch (action.type) {
      default: return state;
    }
  }
});

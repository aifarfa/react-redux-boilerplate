import { combineReducers } from 'redux-immutable'
import request from 'superagent'
// action types
// -------------
export const PERMISSION_LOAD_SUCCESS = 'PERMISSION_LOAD_SUCCESS'
export const PERMISSION_LOAD_FAILED = 'PERMISSION_LOAD_FAILED'
export const PERMISSION_LOADING = 'PERMISSION_LOADING'

// reducers
// ---------
const permission = (state = false, action) => {
  switch (action.type) {

  case PERMISSION_LOAD_SUCCESS:
    return action.result.canAccess || false;
  default:
    return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {

  case PERMISSION_LOADING:
    return true;

  case PERMISSION_LOAD_SUCCESS:
    return false;

  case PERMISSION_LOAD_FAILED:
    return false;

  default:
    return state;
  }
}

/**
 * home state reducers
 * @type {function(state, action)}
 */
export default combineReducers({
  permission,
  isLoading
});

// actions
// --------
export const onLoad = (dispatch) => () => {
  dispatch(loading());

  request
    .get('test.json')
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) {
        dispatch(getPermissionFailed(err));
      } else {
        const result = res.body || JSON.parse(res.text);
        dispatch(getPermissionSuccess(result));
      }
    });
}

export const getPermissionSuccess = (result) => {
  return {
    type: PERMISSION_LOAD_SUCCESS,
    result
  }
}

export const getPermissionFailed = (error) => {
  return {
    type: PERMISSION_LOAD_FAILED,
    error
  };
}

export const loading = () => {
  return {
    type: PERMISSION_LOADING
  }
}

import request from 'superagent'
// action types
// -------------
export const PERMISSION_LOAD_SUCCESS = 'PERMISSION_LOAD_SUCCESS';

// reducers
// --------------
export const permission = (state = false, action) => {
  switch (action.type) {

  case PERMISSION_LOAD_SUCCESS:
    {
      const value = action.value.canAccess;
      console.log('PERMISSION_LOAD_SUCCESS', value);
      return value;
    }
  default:
    return state;
  }
}

// actions
export const onLoad = (dispatch) => () => {
  request
    .get('/test.json')
    .set('Accept', 'application/json')
    .end(function (err, res) {
      const action = {
        type: PERMISSION_LOAD_SUCCESS,
        value: res.body
      }
      dispatch(action);
    });
}

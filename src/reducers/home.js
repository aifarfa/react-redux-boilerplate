import request from 'superagent';
// action types
// -------------
export const PERMISSION_LOAD_SUCCESS = 'PERMISSION_LOAD_SUCCESS';

// reducers
// --------------
export const permission = (state, action) => {
  switch (action.type) {

  case PERMISSION_LOAD_SUCCESS:
    {
      const value = action.value.ok;
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
      console.log('request end', res.body);
      // Calling the end function will send the request
      const action = {
        type: PERMISSION_LOAD_SUCCESS,
        value: res.body
      }
      dispatch(action);
    });
}

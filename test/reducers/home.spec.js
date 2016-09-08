import { expect } from 'chai'
import nock from 'nock'
import * as td from 'testdouble'
import * as home from '../../src/modules/home'

describe('reducer: home', () => {

  const reducer = home.default;

  it('defines root reducer as default', () => {
    expect(reducer).to.be.ok;
  })

  describe('default state', () => {
    let state;

    before(() => {
      const action = { type: null }
      state = reducer(undefined, action);
    })

    it('is not loading', () => {
      expect(state.get('isLoading')).to.eq(false, 'isLoading')
    })
    it('has no permission', () => {
      expect(state.get('permission')).to.eq(false, 'permission')
    })
  })

  describe('when loading', () => {
    let state;

    before(() => {
      const action = home.loading();
      state = reducer(undefined, action);
    });

    it('isLoading', () => {
      expect(state.get('isLoading')).to.eq(true);
    })
  })

  describe('when load success', () => {
    let state;

    before(() => {
      const action = home.getPermissionSuccess({ canAccess: true })
      state = reducer(undefined, action);
    })

    it('is not loading', () => {
      expect(state.get('isLoading')).to.eq(false);
    })
    it('set permission', () => {
      expect(state.get('permission')).to.eq(true);
    })
  })

  describe('when load failed', () => {
    let state;

    before(() => {
      const action = home.getPermissionFailed(new Error('what!?'));
      state = reducer(undefined, action);
    })

    it('is not loading', () => {
      expect(state.get('isLoading')).to.eq(false);
    })
    it('set permission: false', () => {
      expect(state.get('permission')).to.eq(false);
    })
  })

  describe('fetch permission async', () => {
    const dispatch = td.function(); // spy
    const response = { canAccess: false }

    before('onLoad', () => {
      const onLoad = home.onLoad(dispatch)
      nock('http://test.json')
        .get('/')
        .reply(200, response);
      onLoad();
    })

    it('dispatch PERMISSION_LOADING once', () => {
      td.verify(dispatch(home.loading()))
    })

    it('dispatch PERMISSION_LOAD_SUCCESS', () => {
      td.verify(dispatch(home.getPermissionSuccess(response)))
    })

    it('dispatch sequence of loading, success', () => {
      const exp = td.explain(dispatch)
      const firstCall = exp.calls[0]
      const secondCall = exp.calls[1]
        // console.log(exp.description);
      expect(exp.callCount).to.eq(2)
      expect(firstCall.args[0].type).to.eql(home.PERMISSION_LOADING)
      expect(secondCall.args[0].type).to.eql(home.PERMISSION_LOAD_SUCCESS)
      expect(secondCall.args[0].result).to.eql(response)
    })
  })
})

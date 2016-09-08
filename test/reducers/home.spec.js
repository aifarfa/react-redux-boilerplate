import { expect } from 'chai'
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
      const action = { type: home.PERMISSION_LOADING };
      state = reducer(undefined, action);
    });

    it('isLoading', () => {
      expect(state.get('isLoading')).to.eq(true);
    })
  })

  describe('when load success', () => {
    let state;

    before(() => {
      const action = {
        type: home.PERMISSION_LOAD_SUCCESS,
        result: { canAccess: true }
      };
      state = reducer(undefined, action);
    });

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
      const action = {
        type: home.PERMISSION_LOAD_FAILED,
        error: new Error('what!?')
      };
      state = reducer(undefined, action);
    });

    it('is not loading', () => {
      expect(state.get('isLoading')).to.eq(false);
    })
    it('set permission: false', () => {
      expect(state.get('permission')).to.eq(false);
    })
  })

  describe('fetch permission async', () => {
    before('onLoad', () => {
      // TODO: create store and dispatch action
    })
  })
})

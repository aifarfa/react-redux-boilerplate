
import React from 'react'
import {Home} from '../../src/components/Home'
import {expect} from 'chai'
// import * as sinon from 'sinon'
import * as td from 'testdouble'
import * as TestUtils from 'react-addons-test-utils'

describe('component: Home', () => {

  it('calls props onLoad when component did mount', () => {
    // const onLoad = sinon.spy()
    const onLoad = td.function()
    const component = TestUtils.renderIntoDocument(<Home onLoad={onLoad} />)
    // sinon.assert.calledOnce(onLoad)
    const stub = td.explain(onLoad)
    // console.log(stub.description);
    td.verify(onLoad())
    expect(stub.callCount).to.eq(1, 'onLoad called once');
  })

});

import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Hello from './Hello'
/**
 * dump component
 */
export class Home extends React.Component {

  componentDidMount() {
    console.log('componentDidMount Home')
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Hello hasPermission={this.props.hasPermission}/>
      </div>
    );
  }
}

const propsMapper = (state) => {
  console.log('props from state', state.toJS());

  return {
    'hasPermission': state.get('permission'),
    'title': 'home page'
  }
}

const actionMapper = (dispatch) => {
  return {

  }
}

/**
 * default
 */
export default connect(propsMapper, actionMapper)(Home)

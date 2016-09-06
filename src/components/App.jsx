import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default class App extends React.Component {

  componentWillMount() {
    // console.log('WillMount App')
  }

  componentDidMount() {
    // console.log('DidMount App')
  }

  render() {
    return (
      <div>
        <h2>App here.</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.displayName = 'App'
App.propTypes = {
  children: PropTypes.element
}

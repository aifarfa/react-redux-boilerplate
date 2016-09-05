import React from 'react';

export default class Home extends React.Component {

  componentDidMount() {
    console.log('componentDidMount Home')
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps Home', nextProps)
  }

  render() {
    return (
      <div>
        <h3>Hello, home page.</h3>
      </div>
    );
  }
}

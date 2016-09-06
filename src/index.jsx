import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import {reducers} from './modules'
import App from './components/App'
import About from './components/About'
import Home from './components/Home'

// require('./style.scss');
// require('../node_modules/bootstrap/dist/css/bootstrap.css');

const initialState = Immutable.fromJS({
  routing: {}
});

const middleware = applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory));
const store = createStore(reducers, initialState, compose(middleware));

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS()
  }
});

const rootComponent = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} path="/">
        <IndexRoute component={Home}/>
        <Route component={About} path="/about"/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById('app'));

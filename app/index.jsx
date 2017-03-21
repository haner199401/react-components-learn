import './components/style/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {createHashHistory} from 'history';
import {App, Home, TodoApp, WikiBox} from './container/App';
import NotFound from './components/NotFound';
import todo from './components/Todos/reducer/reducers';
var store = createStore(combineReducers({
    todo,
    routing: routerReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const history = syncHistoryWithStore(browserHistory, store);


window.store = store;

/*
 App 入口
 */
ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="topic" component={TodoApp}/>
                <Route path="wiki" component={WikiBox}/>
            </Route>
            <Route path="*" component={NotFound} status={404}/>
        </Router>
    </Provider>
), document.querySelector('#container'));
import './components/style/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory,IndexRoute,DefaultRouter} from 'react-router';
import {App,Home,Topic,Other} from './components/App';
import NotFound from './components/NotFound';


/*
 App 入口
 */

ReactDOM.render((
    <Router history={hashHistory}>

        <Route path="/" component={App}>
			<Route path="home" component={Home} />
            <Route path="topic" component={Topic} />
            <Route path="other" component={Other} />
        </Route>

        <Route path="*" component={NotFound} status={404}/>
    </Router>

), document.querySelector('#container'));
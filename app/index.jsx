import './components/style/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory,IndexRoute,useRouterHistory,browserHistory} from 'react-router';
import { createHashHistory } from 'history'
import {App,Home,Topic,Other,WikiBox} from './components/App';
import NotFound from './components/NotFound';

//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

/*
 App 入口
 */
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
			<Route path="home" component={Home} />
            <Route path="topic" component={Topic} />
            <Route path="wiki" component={WikiBox} />
        </Route>
        <Route path="*" component={NotFound} status={404}/>
    </Router>

), document.querySelector('#root'));
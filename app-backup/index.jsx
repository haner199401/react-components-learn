import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory} from 'react-router';
import Affix from './components/Affix';
/**
 * APP
 */
const App = React.createClass({
    render() {
        return (
            <div>
                <h1>React Componets</h1>
                <ul>
                    <li><Link to="/affix">Affix</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});

/**
 * 404
 */
const NotFound = React.createClass({
    render() {
        return <h3>你来错地方了吧!</h3>
    }
});


/**
 * Affix
 */
const Affix_ = React.createClass({
    render(){
        return <Affix>
            <button className="btn btn-success">固定到顶部</button>
        </Affix>
    }
});


ReactDOM.render((
    <Router history={hashHistory}>

        <Route path="/" component={App}>
            <Route path="affix" component={Affix_}/>
        </Route>

        <Route path="*" component={NotFound} status={404}/>
    </Router>

), document.querySelector('#container'));
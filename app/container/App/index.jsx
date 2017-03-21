/**
 * Created by haner on 16/6/13.
 *
 */
import './style/index.scss';
import React from 'react';
import { Link } from 'react-router';
import TodoApp from '../../components/Todos';
import WikiBox from '../../components/Wiki';
import Home from '../Home';

/**
 * APP 各个模块
 * @type {Home}
 */
exports.Home = Home;
exports.TodoApp = TodoApp;
exports.WikiBox = WikiBox;


export class App extends React.Component {
    render() {
		return (<div className="container">
            <div className="view">
                    {this.props.children}
            </div>

            <nav className="tabbar tabbar-bonday">
                <Link className="tabbar-item" to="/home" activeClassName="active">
                    <span className="tabbar-label">主页</span>
                </Link>
                <Link className="tabbar-item" to="/topic" activeClassName="active">
                    <span className="tabbar-label">话题</span>
                </Link>
                <Link className="tabbar-item" to="/wiki" activeClassName="active">
                    <span className="tabbar-label">Wiki</span>
                </Link>
            </nav>
        </div>);
    }
}












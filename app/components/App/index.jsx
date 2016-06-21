/**
 * Created by haner on 16/6/13.
 *
 */
import './style/index.scss';
import React from 'react';
import { Link } from 'react-router';
import Loader from '../Loader';
import Home from '../Home';
import Topic from '../Topic';
import Other from '../Other';

/**
 * APP 各个模块
 * @type {Home}
 */
exports.Home = Home;
exports.Other = Other;
exports.Topic = Topic;


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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
                <Link className="tabbar-item" to="/other" activeClassName="active">
                    <span className="tabbar-label">其他</span>
                </Link>
            </nav>
        </div>);
    }
}












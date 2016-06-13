/**
 * Created by haner on 16/6/13.
 *
 */
import './style/index.scss';
import React from 'react';
import { Link } from 'react-router';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
		return (<div className="row">
                    <div className="col-md-12">{this.props.children}</div>
                    <div className="col-md-12">
                         <ul className="nav">
                              <li><Link to="/home">Home</Link></li>
                              <li><Link to="/other">Other</Link></li>
                              <li><Link to="/topic">Topic</Link></li>
                        </ul>
                    </div>
                </div>);
    }
}






export class Home extends React.Component {
    render() {
		return (<div> Home </div>);
    }
}

export class Other extends React.Component {
    render() {
		return (<div> Other </div>);
    }
}

export class Topic extends React.Component {
    render() {
		return (<div> Topic </div>);
    }
}
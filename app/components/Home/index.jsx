/**
 * Created by haner on 16/6/21.
 */
import './style/home.scss';

import React from 'react';
import HomeList from './HomeList.jsx';
import HomeListData from '../../mock-data/homelist_data';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }


    componentDidMount() {
        this.setState({
            data:this.state.data.concat(HomeListData.ListData.data)
        });
    }

    render() {
        return (
            <div className="home">
                <h3>HomeList</h3>
                <HomeList data={this.state.data}/>
            </div>
        );
    }

}


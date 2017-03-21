/**
 * Created by haner on 16/6/21.
 */
import React from 'react';
import HomeList from '../../components/Home/HomeList';
import Immutable from 'immutable';
import request from 'superagent';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:Immutable.List([])
        };
    }

    componentDidMount() {
        // const { dispatch } = this.props;
        request.get('https://api.xxjz.org/post?type=article').end(function(t,res){
            this.setState({
                data:Immutable.List(res.body)
            });
        }.bind(this));
    }

    render() {
        return (
            <div className="home">
                <HomeList data={this.state.data}/>
            </div>
        );
    }

}




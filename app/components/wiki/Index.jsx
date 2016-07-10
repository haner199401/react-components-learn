/**
 * Created by haner on 16/6/21.
 */

import React from 'react';
import Immutable from 'immutable';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import _ from 'lodash';
import Loader from '../Loader';



// Wiki Component
class AutoComplete extends React.Component {
    render() {
        return (
            <div style={{margin:'10px 5px'}}>
                <a target="blank" href={this.props.link}><p>{this.props.title}</p></a>
                <p style={{fontSize:'12px'}}>{this.props.desc}</p>
            </div>
        );
    }
}


class AutoCompleteBox extends React.Component {
    render() {
        var nodes = this.props.list.map(function (item, i) {
            return <AutoComplete link={item.link} title={item.title} desc={item.desc} key={i}/>;
        });
        return (
            <div className="autocompleteNodes">
                {nodes}
            </div>
        );
    }
}

export default class WikiBox extends React.Component {

    constructor() {
        super();
        this.state = {autocomplete: Immutable.List([]), keyWord: '',isShowLoading:!!0};
    }

    static defaultProps = {
        style: {
            wikibox: {
                padding: '5px'
            },
            searchInput: {
                width: '100%',
                borderRadius: '5px',
                border: 'none',
                padding: '5px',
                background: '#dcdcdc',
                color: '#909090'
            }
        }
    };


    makeCall(keyWord) {
        const wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=";

        this.setState({isShowLoading:!0});

        request.get(wikiUrl + encodeURIComponent(keyWord)).use(jsonp).end(function (err, res) {
            let data = _.zipWith(res.body[1],res.body[2],res.body[3],function(title,desc,link){
                return {title:title,desc:desc,link:link}
            });
            this.setState({autocomplete: Immutable.List(data), keyWord: '',isShowLoading:!!0});
        }.bind(this));

        //request.get('https://api.xxjz.org/post?type=event').end(function(t,res){
        //    console.log(res.body);
        //});
        //


    }

    handleKeyUp(e) {
        e.stopPropagation();
        var k = e.target.value || '';
        k.length > 0 ? this.makeCall(k) : this.setState({autocomplete: Immutable.List([]), keyWord: ''});
        return false;
    }

    render() {
        console.log(this.state.isShowLoading);
        return (
            <div style={this.props.style.wikibox}>
                <input type="text" style={this.props.style.searchInput} placeholder="WIKI搜索" onKeyUp={this.handleKeyUp.bind(this)}/>
                <AutoCompleteBox list={this.state.autocomplete}/>
                {this.state.isShowLoading ? <Loader/> : '' }
            </div>
        );
    }
}
/**
 * Created by haner on 16/6/21.
 */

import React from 'react';


class HomeRow extends React.Component {

    render() {
        return (<li>
            <img src={this.props.coverImg} alt=""/>
            <h3>{this.props.title}</h3>
        </li>);
    }
}


class HomeList extends React.Component {

    render() {

        return (
            <ul>
                {this.props.data.map(function(item,key){
                    return <HomeRow key={key} coverImg={item.poster.url} title={item.title}/>
                })}
            </ul>
        );
    }
}


export default HomeList;




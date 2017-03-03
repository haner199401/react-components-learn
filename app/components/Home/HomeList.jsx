/**
 * Created by haner on 16/6/21.
 */

import React from 'react';
import HomeRow from './HomeRow';

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




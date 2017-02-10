/**
 * Created by haner on 16/8/10.
 */

import React, {Component, PropTypes} from 'react';

/**
 * 添加TODO
 */
export default class AddTodo extends Component {

    render() {
        return (<div>
            <input type='text' ref='input'/>
            <button onClick={e => this.handleClick(e)}>Add</button>
        </div>);
    }


    handleClick(e){
        const node = this.refs.input;
        const text = node.value.trim();
        !!text ? this.props.onClickAdd(text) : '';
        node.value = '';
    }

}
/**
 * 对外暴露 API
 * @type {{onClickAdd: *}}
 */
AddTodo.propTypes = {
    onClickAdd: PropTypes.func.isRequired
};
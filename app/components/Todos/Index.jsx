/**
 * Created by haner on 16/6/21.
 */

import React,{PropTypes} from 'react';
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import FooterFilter from './component/FooterFilter';
import { createStore } from 'redux';
import { connect } from 'react-redux'
import {createSelector} from 'reselect';
import {addTodo,completeTodo,setVisibilityFilter,VisibilityFilters} from './action/action';
class TodoApp extends React.Component {

    render() {
        const {dispatch,visibleTodos, visibilityFilter } = this.props;

        return (
            <div>
                <AddTodo onClickAdd={text=>{dispatch(addTodo(text))}}/>
                <TodoList onTodoClick={idx=>{dispatch(completeTodo(idx))}} todos={visibleTodos}/>
                <FooterFilter
                    filter = {visibilityFilter}
                    onFilterChange={filter =>
                        dispatch(setVisibilityFilter(filter))
                    } />
            </div>
        );
    }

}



TodoApp.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};



const getVisibilityFilter = (state) => state.visibilityFilter;
const getTodos = (state) => state.todos;

const getVisibleTodos = createSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {

            case VisibilityFilters.SHOW_ALL:
                return todos;

            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(t => t.completed);

            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(t => !t.completed);
        }
    }
);



function select(state) {
    return {
        visibleTodos: getVisibleTodos(state.todo),
        visibilityFilter:getVisibilityFilter(state.todo)
    };
}

export default connect(select)(TodoApp);

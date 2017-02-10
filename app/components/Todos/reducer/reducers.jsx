/**
 * Created by haner on 16/8/10.
 */

import {combineReducers} from 'redux';
import {ADD_TODO, SET_VISIBILITY_FILTER, COMPLETE_TODO, VisibilityFilters} from '../action/action';

const {SHOW_ALL} = VisibilityFilters;


function todos(state = [], action) {
    switch (action.type) {

        case ADD_TODO:
            return [...state,
                {
                    text: action.text,
                    completed: !!0
                }];

        case COMPLETE_TODO:
            return [...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: !0
                }),
                ...state.slice(action.index + 1)];

        default:
            return state;
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
}


const todo = combineReducers({
    visibilityFilter,
    todos
});

export default todo;
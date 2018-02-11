import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import counterReducer from './counterReducer';
import data from './feedTableReducer';

export default combineReducers({
    router: routerReducer,
    counterReducer,
    data
})

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fleets from './fleets'

const rootReducer = combineReducers({ fleets, routing: routerReducer });

export default rootReducer;

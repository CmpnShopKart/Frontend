import {combineReducers} from 'redux';
import buyerReducer from './buyer/buyer-reducer';

const rootReducer = combineReducers({
    buyer:buyerReducer
});

export default rootReducer;
import {combineReducers} from 'redux';
import buyerReducer from './buyer/buyer-reducer';
import sellerReducer from './seller/seller-reducer';

const rootReducer = combineReducers({
    buyer:buyerReducer,
    seller:sellerReducer
});

export default rootReducer;
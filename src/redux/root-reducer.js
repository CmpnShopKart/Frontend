import {combineReducers} from 'redux';
import buyerReducer from './buyer/buyer-reducer';
import sellerReducer from './seller/seller-reducer';
import shopReducer from './shop/shop-reducer';

const rootReducer = combineReducers({
    buyer:buyerReducer,
    seller:sellerReducer,
    shop:shopReducer
});

export default rootReducer;
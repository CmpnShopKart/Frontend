import productActionTypes from './product.types';
import axios from 'axios';
import productsReducer from './products-reducer';

export const getProducts = (shopId) => {
    return async dispatch => {
        try{
            dispatch({type:productActionTypes.FETCHING_PRODUCT_DETAILS});
            const res = await axios.get(`/product/all/${shopId}`);
            dispatch({type:productActionTypes.FETCHING_PRODUCT_DETAILS_SUCCESS,payload:res.data});
            return res; 
        }catch(err){
            dispatch({type:productActionTypes.FETCHING_PRODUCT_DETAILS_FAILURE,payload:err})
        }
    }
}


export const addProduct = (formData) => {
    return async dispatch => {
        try{
            dispatch({type:productActionTypes.ADDING_PRODUCT_DETAILS});
            const res = await axios.post('/product',formData);
            dispatch({type:productActionTypes.ADDING_PRODUCT_DETAILS_SUCCESS});
            return res;
        }catch(err){
            dispatch({type:productsReducer.ADDING_PRODUCT_DETAILS_FAILURE,payload:err});
        }
    }
}
import shopActionTypes from './shop.types';
import axios from 'axios';


export const getShopDetails = (sellerId) => {
    return async dispatch => {
        try{
            dispatch({type:shopActionTypes.FETCHING_SHOP_DETAILS});
            const res = await axios.get(`/shop/${sellerId}`);
            dispatch({type:shopActionTypes.FETCHING_SHOP_DETAILS_SUCCESS,payload:res.data});
            return res;
        }catch(err){
            dispatch({type:shopActionTypes.FETCHING_SHOP_DETAILS_FAILURE,payload:err});
        }
    }   
}


export const registerShop = (formData) => {
    return async dispatch => {
        try{
            dispatch({type:shopActionTypes.ADDING_SHOP_DETAILS});
            const res = await axios.post('/shop/register',formData);
            dispatch({type:shopActionTypes.ADDING_SHOP_DETAILS_SUCCESS,payload:res.data});
            return res;
        }catch(err){
            dispatch({type:shopActionTypes.ADDING_SHOP_DETAILS_FAILURE,payload:err})
        }
    }
}
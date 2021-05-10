import buyerActionTypes from './buyer.types';
import axios from 'axios';

export const buyerSignIn = (formData) => {
    return async(dispatch) => {
        try{
            dispatch({type:buyerActionTypes.BUYER_SIGN_IN})
            const res = await axios.post('/user/signin',formData)
            dispatch({type:buyerActionTypes.BUYER_SIGN_IN_SUCCESS,payload:res.data})
            return res.data;
        }catch(err){
            dispatch({type:buyerActionTypes.BUYER_SIGN_IN_FAILURE,payload:err})
        }
    }
}


export const getNearbyShops = (formData) => {
    console.log(formData)
    return async dispatch => {
        try{
            dispatch({type:buyerActionTypes.FETCHING_NEARBY_SHOPS});
            const res = await axios.get(`/user/getshops/${formData.latitude}/${formData.longitude}`);
            dispatch({type:buyerActionTypes.FETCHING_NEARBY_SHOPS_SUCCESS,payload:res.data});
            return res;            
        }catch(err){
            dispatch({type:buyerActionTypes.FETCHING_NEARBY_SHOPS_FAILURE,payload:err})
        }
    }
}


export const getSelectedShopProducts = (shopId) => {
    return async dispatch => {
        try{
            dispatch({type:buyerActionTypes.FETCHING_PRODUCTS_DETAILS});
            const res = await axios.get(`/shop/products/${shopId}`);
            dispatch({type:buyerActionTypes.FETCHING_PRODUCTS_DETAILS_SUCCESS,payload:res.data});
            return res;
        }catch(err){
            dispatch({type:buyerActionTypes.FETCHING_PRODUCTS_DETAILS_FAILURE,payload:err});
        }
    }
}

export const addToCart = (product) => {
    return (dispatch) => {
        dispatch({type:buyerActionTypes.ADD_TO_CART,payload:product})
    }
}


export const removeFromCart = (productId) => {
    return dispatch => {
        dispatch({type:buyerActionTypes.REMOVE_FROM_CART,payload:productId})
    }
}


export const clearCart = () => {
    return dispatch => {
        dispatch({type:buyerActionTypes.CLEAR_CART})
    }
}


export const getUserOrders = (userId) => {
    return async dispatch => {
        try{
            dispatch({type:buyerActionTypes.FETCHING_BUYER_ORDERS});
            const res = await axios.get(`/user/getOrders/${userId}`);
            console.log(res);
            dispatch({type:buyerActionTypes.FETCHING_BUYER_ORDERS_SUCCESS,payload:res.data});
            return res;
        }
        catch(err){
            dispatch({type:buyerActionTypes.FETCHING_BUYER_ORDERS_FAILURE,payload:err});
        }
    }
} 
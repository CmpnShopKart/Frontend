import sellerActionTypes from './seller.types';
import axios from 'axios';

export const sellerSignIn = (formData) => {
    return async(dispatch) => {
        try{
            dispatch({type:sellerActionTypes.SELLER_SIGN_IN})
            const res = await axios.post('/seller/signin',formData)
            dispatch({type:sellerActionTypes.SELLER_SIGN_IN_SUCCESS,payload:res.data})
            return res;
        }catch(err){
            dispatch({type:sellerActionTypes.SELLER_SIGN_IN_FAILURE,payload:err});
        }
    }
}

export const sellerRegistration = (formData) => {
    return async(dispatch) => {
        try{
            dispatch({type:sellerActionTypes.SELLER_REGISTRATION});
            const res = await axios.post('/seller/registration',formData);
            dispatch({type:sellerActionTypes.SELLER_REGISTRATION_SUCCESS,payload:res.data});
            return res;
        }catch(err){
            dispatch({type:sellerActionTypes.SELLER_REGISTRATION_FAILURE,payload:err});
        }
    }
}
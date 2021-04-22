import buyerActionTypes from './buyer.types';
import axios from 'axios';

const buyerSignIn = (formData) => {
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

export default buyerSignIn;
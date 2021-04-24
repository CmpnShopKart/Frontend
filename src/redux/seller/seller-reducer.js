import sellerActionTypes from './seller.types';

const INITIAL_STATE = {
    isSigningIn:null,
    error:null,
    sellerData:{},
    isRegistering:null
}

const sellerReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case sellerActionTypes.SELLER_SIGN_IN:
            return{
                ...state,isSigningIn:true
            }
        case sellerActionTypes.SELLER_SIGN_IN_SUCCESS:
            return{
                ...state,sellerData:action.payload,isSigningIn:false
            }
        case sellerActionTypes.SELLER_SIGN_IN_FAILURE:
            return{
                ...state,isSigningIn:false,error:action.payload
            } 
        case sellerActionTypes.SELLER_REGISTRATION:
            return{
                ...state,isRegistering:true
            }
        case sellerActionTypes.SELLER_REGISTRATION_SUCCESS:
            return{
                ...state,isRegistering:false,sellerData:{...state.sellerData,sellerRegistered:true}
            }
        case sellerActionTypes.SELLER_REGISTRATION_FAILURE:
            return{
                ...state,isRegistering:false,error:action.payload
            }
        default:
            return{...state}
    }
}


export default sellerReducer;
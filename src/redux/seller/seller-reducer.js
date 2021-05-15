import sellerActionTypes from './seller.types';

const INITIAL_STATE = {
    isSigningIn:null,
    error:null,
    sellerData:{},
    isRegistering:null,
    orders:[],
    isFetching:false,
    isUpdatingStatus:false
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
        case sellerActionTypes.FETCHING_SELLER_ORDERS:
            return {
                ...state,isFetching:true
            }
        case sellerActionTypes.FETCHING_SELLER_ORDERS_SUCCESS:
            return {
                ...state,isFetching:false,orders:[...action.payload]
            }
        case sellerActionTypes.FETCHING_SELLER_ORDERS_FAILURE:
            return {
                ...state,isFetching:false,error:action.payload
            }
        case sellerActionTypes.UPDATING_ORDER_STATUS:
            return {
                ...state,isUpdatingStatus:true
            }
        case sellerActionTypes.UPDATING_ORDER_STATUS_SUCCESS:
            return {
                ...state,isUpdatingStatus:false
            }
        case sellerActionTypes.UPDATING_ORDER_STATUS_FAILURE:
            return {
                ...state,isUpdatingStatus:false,error:action.payload
            }
        default:
            return{...state}
    }
}


export default sellerReducer;
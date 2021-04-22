import buyerActionTypes from './buyer.types';

const INITIAL_STATE = {
    isSigningIn:null,
    error:null,
    buyerData:{}
}

const buyerReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case buyerActionTypes.BUYER_SIGN_IN:
            return{
                ...state,isSigningIn:true
            }
        case buyerActionTypes.BUYER_SIGN_IN_SUCCESS:
            return{
                ...state,buyerData:action.payload,isSigningIn:false
            }
        case buyerActionTypes.FETCHING_USER_DETAILS_FAILURE:
            return{
                ...state,isSigningIn:false,error:action.payload
            } 
        default:
            return{...state}
    }
}


export default buyerReducer;
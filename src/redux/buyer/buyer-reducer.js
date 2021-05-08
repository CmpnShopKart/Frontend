import buyerActionTypes from './buyer.types';

const INITIAL_STATE = {
    isSigningIn:null,
    error:null,
    buyerData:{},
    isFetching:null,
    cartItems:[]
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
        case buyerActionTypes.FETCHING_NEARBY_SHOPS:
            return {
                ...state,isFetching:true
            }
        case buyerActionTypes.FETCHING_NEARBY_SHOPS_SUCCESS:
            return  {
                ...state,isFetching:false,buyerData:{...state.buyerData,nearbyShops:action.payload}
            }
        case buyerActionTypes.FETCHING_NEARBY_SHOPS_FAILURE:
            return {
                ...state,error:action.payload
            }
        case buyerActionTypes.FETCHING_PRODUCTS_DETAILS:
            return {
                ...state,isFetching:true
            }
        case buyerActionTypes.FETCHING_PRODUCTS_DETAILS_SUCCESS:
            return {
                ...state,isFetching:false,buyerData:{...state.buyerData,selectedShopProducts:action.payload}
            }
        case buyerActionTypes.FETCHING_PRODUCTS_DETAILS_FAILURE:
            return {
                ...state,isFetching:false,error:action.payload
            }
        case buyerActionTypes.ADD_TO_CART:
            return {
                ...state,cartItems:[...state.cartItems,action.payload]
            }
        case buyerActionTypes.REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter((product) => product._id !== action.payload);
            return {
                ...state,cartItems:[...updatedCartItems]
            }
        default:
            return{...state}
    }
}


export default buyerReducer;
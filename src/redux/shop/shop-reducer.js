import shopActionTypes from './shop.types';

const INITIAL_STATE = {
    isFetching:null,
    shopData:{},
    error:null,
    isAdding:null
}

const shopReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case shopActionTypes.FETCHING_SHOP_DETAILS:
            return {
                ...state,isFetching:true
            }
        case shopActionTypes.FETCHING_SHOP_DETAILS_SUCCESS:
            return {
                ...state,isFetching:false,shopData:action.payload
            }
        case shopActionTypes.FETCHING_SHOP_DETAILS_FAILURE:
            return {
                ...state,error:action.payload,isFetching:false
            }
        case shopActionTypes.ADDING_SHOP_DETAILS:
            return {
                ...state,isAdding:true
            }
        case shopActionTypes.ADDING_SHOP_DETAILS_SUCCESS:
            return {
                ...state,isAdding:false
            }
        case shopActionTypes.ADDING_SHOP_DETAILS_FAILURE:
            return {
                ...state,isAdding:false,error:action.payload
            }
        default :
            return {
                ...state
            }
    }
}


export default shopReducer;
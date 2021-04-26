import shopActionTypes from './shop.types';

const INITIAL_STATE = {
    isFetching:null,
    shopData:{},
    error:null
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
        default :
            return {
                ...state
            }
    }
}


export default shopReducer;
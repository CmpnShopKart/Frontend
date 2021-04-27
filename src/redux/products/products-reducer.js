import sellerActionTypes from '../seller/seller.types';
import productActionTypes from './product.types';

const INITIAL_STATE = {
    isFetching:null,
    isAdding:null,
    error:null,
    productsData:[]
}

const productsReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case productActionTypes.FETCHING_PRODUCT_DETAILS:
            return {
                ...state,isFetching:true
            }
        case productActionTypes.FETCHING_PRODUCT_DETAILS_SUCCESS:
            return{
                ...state,isFetching:false,productsData:action.payload
            }
        case productActionTypes.FETCHING_PRODUCT_DETAILS_FAILURE:
            return {
                ...state,isFetching:false,error:action.payload
            }
        case productActionTypes.ADDING_PRODUCT_DETAILS:
            return {
                ...state,isAdding:true
            }
        case productActionTypes.ADDING_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,isAdding:false
            }
        case productActionTypes.ADDING_PRODUCT_DETAILS_FAILURE:
            return {
                ...state,isAdding:false,error:action.payload
            }
        default :
            return {
                ...state
            }
    }
}


export default productsReducer;
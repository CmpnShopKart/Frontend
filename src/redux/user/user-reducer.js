import userActionTypes from './user.types';

const INITIAL_STATE = {
    users:[],
    isLoading:null,
    error:null
}

const userReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case userActionTypes.FETCHING_USER_DETAILS:
            return{
                ...state,isLoading:true
            }
        case userActionTypes.FETCHING_USER_DETAILS_SUCCESSS:
            return{
                ...state,users:action.payload,isLoading:false
            }
        case userActionTypes.FETCHING_USER_DETAILS_FAILURE:
            return{
                ...state,isLoading:false,error:action.payload
            } 
        default:
            return{...state}
    }
}


export default userReducer;
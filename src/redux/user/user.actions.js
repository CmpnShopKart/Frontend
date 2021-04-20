import userActionTypes from './user.types';
import axios from 'axios';

const fetchUsers = () => {
    return (dispatch) => {
        dispatch({type:userActionTypes.FETCHING_USER_DETAILS})
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                dispatch({type:userActionTypes.FETCHING_USER_DETAILS_SUCCESSS,payload:res.data})
            })
            .catch(err => {
                dispatch({type:userActionTypes.FETCHING_USER_DETAILS_FAILURE,payload:err})
            })
    }
}

export default fetchUsers;
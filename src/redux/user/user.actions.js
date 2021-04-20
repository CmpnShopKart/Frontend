import userActionTypes from './user.types';
import axios from 'axios';

const fetchUsers = () => {
    return (dispatch) => {
        dispatch({type:userActionTypes.FETCHING_USER_DETAILS})
        console.log('Action dispatched');
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                dispatch({type:userActionTypes.FETCHING_USER_DETAILS_SUCCESSS,payload:res.data})
                console.log('Success');
            })
            .catch(err => {
                dispatch({type:userActionTypes.FETCHING_USER_DETAILS_FAILURE,payload:err})
                console.log('Failure');
            })
    }
}

export default fetchUsers;
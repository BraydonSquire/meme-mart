import axios from 'axios';

const initialState = {
    userInfo:[]
}



const GET_USER_INFO = 'GET_USER_INFO';

export function getUserInfo() {
    const userData = axios.get('/auth/me')
    .then(res => {
         return res.data
        console.log('getuserinfo fired', res.data)
    })
    return {
        type: GET_USER_INFO,
        payload:userData
    }
}





export default function reducer(state = initialState, action) {

    switch(action.type) {


        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {userInfo: action.payload})

        default:
        return state;

    }
}
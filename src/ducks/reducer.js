import axios from 'axios';

const initialState = {
    userInfo:[],
    memes:[{img:'blah', title: 'blah'}]
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

const GET_MEME_LIST = 'GET_MEME_LIST';

export function getMemeList() {
    const memeList = axios.get('/api/getmemes')
    .then(res => {
        return res.data
        console.log('getMemesFired', res.data)
    })
    return {
        type: GET_MEME_LIST,
        payload:memeList
    }
}





export default function reducer(state = initialState, action) {

    switch(action.type) {


        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {userInfo: action.payload})

        case GET_MEME_LIST + '_FULFILLED':
            return Object.assign({}, state, {memes: action.payload})

        default:
        return state;

    }
}
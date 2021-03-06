import axios from 'axios';

const initialState = {
    userInfo:{id:null},
    memes:[
        // {img:'blah', title: 'blah'}
    ],
    meme:{},
    favoritedMeme:[],
    favoriteMemes:[],
    unfavedMeme:[],
    addedMeme:{},
    deletedMeme:{}
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

const GET_MEME = 'GET_MEME';

export function getMeme(id) {
    const singleMeme = axios.get(`/api/getonememe/${id}`)
    .then(res => {
        return res.data[0]
        console.log('getMeme fired')
    })
    return {
        type: GET_MEME,
        payload: singleMeme
    }
}

const FAVORITE_MEME = 'FAVORITE_MEME';

export function favoriteMeme(favData) {
    const favMeme = axios.post('/api/favoritememe',favData)
    .then( res => {
        return res.data
        console.log('favorite meme fired')
    })
    return {
        type:FAVORITE_MEME,
        payload:favMeme
    }
}


const GET_FAVORITES = 'GET_FAVORITES';

export function getFavorites(id) {
    const usersFavs = axios.get(`/api/getfavorites/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type:GET_FAVORITES,
        payload:usersFavs
    }
}

const UNFAVORITE = 'UNFAVORITE';

export function unfavMeme(favid, userid) {
    const unfav = axios.delete(`/api/unfavorite/?favid=${favid}&userid=${userid}` )
    .then( res => {
        return res.data && 'endpoint hit successfully'
    })
    return {
        type:UNFAVORITE,
        payload: unfav
    }
}

const ADD_MEME = 'ADD_MEME';

export function addMeme(img, title) {
    const add = axios.post(`/api/addmeme/?img=${img}&title=${title}`)
    .then( res => {
        return res.data
    })
    return {
        type: ADD_MEME,
        payload: add
    }
}

const DELETE_MEME = 'DELETE_MEME';

export function deleteMeme(id) {
    const erase = axios.delete(`/api/deletememe/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: DELETE_MEME,
        payload: erase
    }
}


export default function reducer(state = initialState, action) {

    switch(action.type) {


        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {userInfo: action.payload})

        case GET_MEME_LIST + '_FULFILLED':
            return Object.assign({}, state, {memes: action.payload})

        case GET_MEME + '_FULFILLED':
            return Object.assign({}, state, {meme: action.payload})

        case FAVORITE_MEME + '_FULFILLED':
            return Object.assign({}, state, {favoritedMeme: action.payload})
            
        case GET_FAVORITES + '_FULFILLED':
            return Object.assign({}, state, {favoriteMemes: action.payload}) 
            
        case UNFAVORITE + '_FULFILLED':
            return Object.assign({}, state, {unfavedMeme: action.payload})    

        case ADD_MEME + '_FULFILLED':
            return Object.assign({}, state, {addedMeme: action.payload})    

        case DELETE_MEME + '_FULFILLED':
            return Object.assign({}, state, {deletedMeme: action.payload})    

        default:
        return state;

    }
}
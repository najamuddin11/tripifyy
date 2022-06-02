import {GET_MESSAGE, GET_MESSAGES, GET_ALL_MESSAGES} from '../actions/types'

const initialState = {
    message: [],
    messages: [],
    allmessages: []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_MESSAGE: 
            return {
                ...state,
                message: action.payload
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case GET_ALL_MESSAGES:
            return {
                ...state,
                allmessages: action.payload
            }
            default: 
            return state;
    }
}
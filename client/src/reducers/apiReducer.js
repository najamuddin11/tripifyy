import { GET_LOCATION, GET_RESTAURANTS, GET_HOTELS,GET_FLIGHTS, API_LOADING } from "../actions/types"

const initialState = {
    loading:false,
    location:[],
    restaurants:[],
    hotels:[],
    flights:[]
}

export default function (state = initialState, action){
    switch (action.type){
        case API_LOADING : return {
            ...state,
            loading:true
        }
        case GET_LOCATION:
            return{
                ...state,
                location:action.payload
            }
        
        case GET_RESTAURANTS:
            return{
                ...state,
                restaurants: action.payload,
                loading:false
            }   

        case GET_HOTELS:
            return {
                ...state,
                hotels: action.payload,
                loading:false

            }
        case GET_FLIGHTS:
            return {
                ...state,
                flights:action.payload,                
                loading:false
            }
        default: 
            return state
    }
}
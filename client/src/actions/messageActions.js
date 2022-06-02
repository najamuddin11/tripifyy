import io from 'socket.io-client'
import {GET_MESSAGE, GET_MESSAGES, GET_ALL_MESSAGES} from './types'

const socket = io('http://localhost:5000/')

export const onJoin = data => dispatch => {
    socket.emit('onJoin', data)
    
}

// export const sendMessage = data => dispatch =>{
//     socket.emit('sendMessage', data)
//     socket.on('receiveSentMessage', message => dispatch({
//         type: GET_MESSAGE,
//         payload: message
//     }))
// }

// export const receiveMessages = (data) => dispatch =>{
//     socket.emit('userData', data)
//     socket.on('receiveMessagesByUser', messages => dispatch({
//         type: GET_MESSAGES,
//         payload: messages
//     }))
// }

// export const receiveAllMessage = (data) => dispatch => {
//     socket.emit('data', data)
//     socket.on('receiveAllMessages', messages => dispatch({
//         type: GET_ALL_MESSAGES,
//         payload: messages
//     }))
// }
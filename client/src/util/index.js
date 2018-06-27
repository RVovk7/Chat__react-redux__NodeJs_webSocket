import {
    connectNewUser,
    disconnectNewUser,
    newMessage
} from '../actions';
import store from '../store';

export default ((wsUrl) => {
    let ws;
    const {
        dispatch
    } = store
    ws = new WebSocket(wsUrl)
    ws.onopen = () => {
        console.log('webSocked open ')
    }
    ws.onmessage = m => {
        const messObj = JSON.parse(m.data);
console.error('FROM_SERVER=>',messObj)
        switch (messObj.type) {
            case 'connect_new_user':
                dispatch(connectNewUser(messObj))
                break;
            case 'disconnect_user':
                dispatch(disconnectNewUser(messObj.userID))
                break;
            case 'message':
                dispatch(newMessage(messObj.data))
                break;
                case 'clientsList':
                dispatch(clientsList(messObj.data))
                break;
            default:
                break;
        }
    }
    let contReconnect = 0;
    const emit = message => {
  
        if (contReconnect > 5) return
        if (ws.readyState === ws.CONNECTING) {
            setTimeout(() => {
                emit(message)
                contReconnect++
            }, 500)
            return
        }
        ws.send(JSON.stringify(message));
        contReconnect = 0;
    }
    return {
        emit
    }
})('ws://localhost:3000');
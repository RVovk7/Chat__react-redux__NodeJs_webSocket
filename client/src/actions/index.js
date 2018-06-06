import constants from '../constants';
export const connectNewUser = data => {
    const {userName,userID}= data
    return {
        type: constants.CONNECTED_NEW_USER,
        userName,
        userID
    }

};
export const disconnectNewUser = userID => {
    return {
        type: constants.DISCONNECT_NEW_USER,
        userID
    }
}
export const newMessage = data => {
    const {
        time,
        text,
        author,
        color
    } = data;
    return {
        type: constants.NEW_MESSAGE,
        time,
        text,
        author,
        color
    }
}
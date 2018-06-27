import constants from '../constants';
export const connectNewUser = data => {
    const {
        userName,
        userID,
        avatar
    } = data
    return {
        type: constants.CONNECTED_NEW_USER,
        userName,
        userID,
        avatar
    }
};
export const disconnectNewUser = userID => ({
    type: constants.DISCONNECT_NEW_USER,
    userID
})

export const clientsList = data => {
    return {
        type: constants.CLIENTS_LIST,
        data
    }
};
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
};
export const isReg = data => {
    console.log('actionIsReg', data)
    return {
        type: constants.IS_REG,
        regStatus: data
    }
};
export const isAuth = data => {

    return {
        type: constants.IS_AUTH,
        isAuth: data
    }
};
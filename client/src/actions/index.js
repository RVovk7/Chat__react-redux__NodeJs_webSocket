import constants from '../constants';
export const connectNewUser = data => {
    return {
        type: constants.CONNECTED_NEW_USER,
       ...data
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
    
    return {
        type: constants.NEW_MESSAGE,
       ...data
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
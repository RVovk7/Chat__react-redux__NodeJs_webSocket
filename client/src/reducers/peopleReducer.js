import constants from '../constants';
const peopleReducer = (state = [], action) => {
    const {
        userName,
        userID,
        type,
        avatar
    } = action;
    switch (type) {
        case constants.CLIENTS_LIST:
        console.error('peopleReducer',action)
            return action.data
            break;
        case constants.CONNECTED_NEW_USER:
            return state.concat({
                userName,
                avatar,
                userID
            })
            break;
        case constants.DISCONNECT_NEW_USER:
            return state.filter(u => u.userID !== userID)

        default:
            return state
            break;
    }


};
export default peopleReducer;
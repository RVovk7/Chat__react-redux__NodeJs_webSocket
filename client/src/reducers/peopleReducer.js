import constants from '../constants';
const peopleReducer = (state = [], action) => {
    const {
        userID,
        type,
    } = action;
    switch (type) {
        case constants.CLIENTS_LIST:
            return ([
                ...action.data
            ])
            break;
        case constants.CONNECTED_NEW_USER:
            return [
                ...action
            ]
            break;
        case constants.DISCONNECT_NEW_USER:
            return state.filter(u => u.userID !== userID)

        default:
            return state
            break;
    }


};
export default peopleReducer;
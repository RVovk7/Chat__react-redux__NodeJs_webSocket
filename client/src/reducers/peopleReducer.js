const initState = [{
        name: 'Wolf',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
    },
    {
        name: 'Alex',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg'
    },
    {
        name: 'John',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg'
    },
    {
        name: 'George',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg'
    },
    {
        name: 'Sam',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg'
    },
    {
        name: 'Andrew',
        avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg'
    },
]

;
import constants from '../constants';
const peopleReducer = (state = [], action) => {
    const {
        userName,
        userID,
        type
    } = action;
    switch (type) {
        case constants.CONNECTED_NEW_USER:
            return state.concat({
                userName,
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg',
                userID
            })
            break;
        case constants.DISCONNECT_NEW_USER:
return state.filter(u=> u.userID !==userID )

        default:
            return state
            break;
    }


};
export default peopleReducer;
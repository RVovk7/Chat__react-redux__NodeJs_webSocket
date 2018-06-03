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

const peopleReducer = (state = initState, action) => {
    if (action.type === 'ADD_NEW_USER') {
        return state.concat({
            name: 'Linda',
            avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg'
        })
    }
    return state
};
export default peopleReducer;
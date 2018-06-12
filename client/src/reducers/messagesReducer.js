import constants from '../constants';
const messagesReducer = (state = [], action) => {
    console.log(action)
  
    switch (action.type) {
        
        case constants.NEW_MESSAGE:
          
            return state.concat({
                time: action.time,
                text: action.text,
                author: action.author,
                color: action.color
            })
    }

    return state;
};
export default messagesReducer;
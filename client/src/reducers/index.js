import {combineReducers} from 'redux';
import messageReducer from './messagesReducer';
import peopleReducer from './peopleReducer'
const chatReducer = combineReducers({
    peopleReducer,
    messageReducer
})
 
export default chatReducer;
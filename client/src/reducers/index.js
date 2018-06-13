import {combineReducers} from 'redux';
import messageReducer from './messagesReducer';
import peopleReducer from './peopleReducer';
import regReducer from './regReducer';
const chatReducer = combineReducers({
    peopleReducer,
    messageReducer,
    regReducer
})
 
export default chatReducer;
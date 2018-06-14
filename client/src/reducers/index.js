import {combineReducers} from 'redux';
import messageReducer from './messagesReducer';
import peopleReducer from './peopleReducer';
import regReducer from './regReducer';
import authReducer from './authReducer';
const chatReducer = combineReducers({
    peopleReducer,
    messageReducer,
    regReducer,
    authReducer
})
 
export default chatReducer;
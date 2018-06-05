import constants from '../constants';
export const connectNewUser = (userName,userID) =>{
    return{
        type: constants.CONNECTED_NEW_USER,
        userName,
        userID
    }
   
};
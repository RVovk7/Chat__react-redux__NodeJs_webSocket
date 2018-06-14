import constants from '../constants';
export default (state =null, action) => {
    console.log('authReducer',action)
    switch (action.type) {
        case constants.IS_AUTH: 
            return action.isAuth
        default:
            return state;
    }
};
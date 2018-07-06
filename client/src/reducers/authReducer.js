import constants from '../constants';
export default (state = {}, action) => {
    switch (action.type) {
        case constants.IS_AUTH:
        console.log('authRed',action.isAuth)
            return {
                ...state,
                isAuth: action.isAuth
            };
        default:
            return state;
    }
};
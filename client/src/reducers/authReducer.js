import constants from '../constants';
let count = 0;
export default (state ='0', action) => {
   count = Math.round(++count % 2);
    switch (action.type) {
        case constants.IS_AUTH: 
            return `${action.isAuth}${count}`;
        default:
            return state;
    }
};
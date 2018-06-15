import constants from '../constants';
let count = 0;
const regReducer = (state = '0', action) => {
    const {
        type,
        regStatus
    } = action;
    count = Math.round(++count % 2);
    switch (type) {
        case constants.IS_REG:
            return `${regStatus}${count}`;
            
            break;

        default:
            return state
            break;
    }
}
export default regReducer;
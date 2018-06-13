import constants from '../constants';
const regReducer = (state = [], action) => {
    const {
        type,
        regStatus
    } = action;
    switch (type) {
        case constants.IS_REG:
            return regStatus
            
            break;
        default:
            return state
            break;
    }
}
export default regReducer;
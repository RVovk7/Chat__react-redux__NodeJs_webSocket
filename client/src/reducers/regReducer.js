import constants from '../constants';
let count = 0;
const regReducer = (state = {}, action) => {
    const {
        type,
        regStatus
    } = action;
    switch (type) {
        case constants.IS_REG:
            return {
                ...state,
                regStatus
            };
            break;

        default:
            return state
            break;
    }
}
export default regReducer;
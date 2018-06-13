import constants from '../constants';
const regReducer  = (state = [], action)=>{
const {type, regStatus }= action;
switch (type) {
    case constants.IS_REG:
    return state.concat(
        regStatus
    );
    break;
    default:
    return state
    break;
}
}
export default regReducer;
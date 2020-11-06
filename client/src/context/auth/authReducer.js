import { LOGIN_SUCCESS, LOGOUT, CLEAR_ERRORS, UPDATE_USER } from '../../utils/constants';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        case LOGOUT:
            return {};
        case CLEAR_ERRORS:
            return {
                ...state,
                    error: null
            }
        default:
            return state;
    }
};

export default authReducer;
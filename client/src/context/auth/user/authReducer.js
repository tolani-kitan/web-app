import { LOGIN_SUCCESS, AUTH_ERROR, LOGOUT, FETCH_USER, UPDATE_USER, SET_CURRENT, CLEAR_ERRORS, LOGIN_FAIL } from '../../../utils/constants';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;

        case FETCH_USER: 
            return action.payload || false;
        case UPDATE_USER: 
            return {
                ...state,
                user: state.user.map(use => use._id === action.payload._id ? action.payload : use),
                loading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
            case SET_CURRENT:
                return {
                    ...state,
                    current: action.payload
                };
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
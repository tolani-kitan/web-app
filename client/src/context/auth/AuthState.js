import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../../utils/constants';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const response = await axios.get('/auth')
            
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    return (
        <AuthContext.Provider 
        value={{
            isAuthenticated: state.isAuthenticated,
            error: state.error,
            clearErrors
        }}> 
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import { USER_LOADED, FETCH_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, SET_CURRENT, UPDATE_USER, LOGOUT, CLEAR_ERRORS } from '../../../utils/constants';
// import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        current: null,
        error: null
    };

    const fetchUser = () => async () => {
        try {
            const response = await axios.get('/api/currentUser');
            dispatch({ type: FETCH_USER, payload: response.data})

        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const updateUser = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
            const res = await axios.put(`/api/user/${user._id}`, user, config);

            dispatch({ 
                type: UPDATE_USER, 
                payload: res.data 
            });
    }

    const setCurrent = user => {
        dispatch({ type: SET_CURRENT, payload: user })
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    return (
        <AuthContext.Provider 
        value={{
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            current: state.current,
            fetchUser,
            updateUser,
            clearErrors
        }}> 
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
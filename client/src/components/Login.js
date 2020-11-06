import React, { useState,useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import '../css/login.css';
import logo from '../css/images/login.jpg';
import logo1 from '../css//images/logo.svg';
import { Link } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/user/AuthContext';


const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === "Inavalid Credentials") {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

  
    const [errorMsg, setErrorMsg] = useState('');


    const handleLogin = e => {
        e.preventDefault(); 
      
      
    }

    return (
      <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={logo} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={logo1} alt="logo" className="logo" />
                </div>
                <p class="login-card-description">Sign into your account</p>
           <Form onSubmit={handleLogin}>
            <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    class="form-control" 
                    placeholder="Email address" 
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    class="form-control" 
                    placeholder="***********" 
                    />
                  </div>
                  <input name="login" class="btn btn-block login-btn mb-4" type="button" value="Login" />
          </Form>
          <Link to="#" className="forgot-password-link">Forgot password?</Link>
              <p className="login-card-footer-text">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>

              <p> Or Sign in with</p>
              <a href='/auth/google'>
              <img src="https://img.icons8.com/plasticine/50/000000/google-logo.png"/>
              </a>
              <img src="https://img.icons8.com/plasticine/50/000000/facebook-new.png"/>

              <div className="login-card-footer-nav">
                <Link to="#!">Terms of use.</Link>
                <Link to="#!">Privacy policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
}

export default Login;

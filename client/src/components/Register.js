import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../css/register.css";
import logo from "../css/images/banking.jpg";
import logo1 from "../css//images/logo.svg";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/AuthContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists ") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { first_name, last_name, email, password, confirm_password } = user;

  const inputChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== confirm_password) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ first_name, last_name, email, password });
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center max-vh-100 py-3 py-md-0">
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
                  <p class="login-card-description">Register a new account</p>
                  <Form onSubmit={handleRegister}>
                    {errorMsg && errorMsg.signin_error && (
                      <p className="errorMsg centered-message">
                        {errorMsg.signin_error}
                      </p>
                    )}
                    <div class="form-group">
                      <label for="password" class="sr-only">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fName"
                        class="form-control"
                        placeholder="first name"
                        onChange={inputChange}
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="password" class="sr-only">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lName"
                        class="form-control"
                        placeholder="last name"
                        onChange={inputChange}
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="email" class="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Email address"
                        onChange={inputChange}
                      />
                    </div>

                    <div class="form-group mb-4">
                      <label for="password" class="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder="Enter your password"
                        onChange={inputChange}
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="password" class="sr-only">
                        {" "}
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="password2"
                        class="form-control"
                        placeholder="Confirm password"
                        onChange={inputChange}
                      />
                    </div>

                    <input
                      name="register"
                      class="btn btn-block login-btn mb-4"
                      type="button"
                      value="Register"
                    />
                  </Form>
                  <p className="login-card-footer-text">
                    Already have an account?{" "}
                    <Link to="/" className="text-reset">
                      Login here
                    </Link>
                  </p>
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
    </div>
  );
};

export default Register;

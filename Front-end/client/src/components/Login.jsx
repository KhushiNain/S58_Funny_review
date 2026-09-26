import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [signInfo, setSignInfo] = useState({
    username: '',
    password: '',
  });

  const [logInfo, setLogInfo] = useState({
    username: '',
    password: '',
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:7777/user/')
      .then((user) => {
        setData(user.data);
        console.log(user.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSignUpChange = (e, field) => {
    e.preventDefault();
    if (field === 'username') {
      setSignInfo({ ...signInfo, username: e.target.value });
    } else {
      setSignInfo({ ...signInfo, password: e.target.value });
    }
  };

  const handleLogInChange = (e, field) => {
    e.preventDefault();
    if (field === 'username') {
      setLogInfo({ ...logInfo, username: e.target.value });
    } else {
      setLogInfo({ ...logInfo, password: e.target.value });
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:7777/signUp/', signInfo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:7777/logIn/', logInfo)
      .then((response) => {
        Cookies.set('token', response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand-panel">
          <div className="brand-badge">FlavorFind</div>
          <h1>Welcome back.</h1>
          <p>Sign in to discover your next favorite restaurant and food experience.</p>
        </div>

        <div className="form-panel">
          <form className="auth-form" onSubmit={(e) => handleLogInSubmit(e)}>
            <h2>Login</h2>

            <label className="field">
              <span>Username</span>
              <input
                onChange={(e) => handleLogInChange(e, 'username')}
                name="username"
                type="text"
                placeholder="Enter your username"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                onChange={(e) => handleLogInChange(e, 'password')}
                type="password"
                placeholder="Enter your password"
              />
            </label>

            <div className="row-between">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="primary-btn">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

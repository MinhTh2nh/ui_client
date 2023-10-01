import React from "react";
import "./login.css";
import user_icon from "../assests/person.png";
import pwd_icon from "../assests/password.png";
import email_icon from "../assests/email.png";

import { useRef, useState, useEffect , useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import axios from 'axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  //For authentication
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className="container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>

          <div>
            <form className="inputs-form" onSubmit={handleSubmit}>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>

              <div className="input">
                <img src={pwd_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              <div className="forgot-pwd">
                Forgot the password ?<span>Click here!</span>
              </div>
              <div className="submit-container">
                <button className="submit">Login</button>
                <button className="submit">
                  {/* {Put a router link here} */}
                  <a href="#" className="signUpUnderline">
                    Sign Up
                  </a>
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      ;
    </>
  );
};

export default Login;

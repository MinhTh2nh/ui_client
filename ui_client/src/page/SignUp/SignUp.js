import React from "react";
import "./SignUp.css";
import user_icon from "../assests/person.png";
import pwd_icon from "../assests/password.png";
import email_icon from "../assests/email.png";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
const SignUp = () => {
  //JS part
  //Declare variables
  const userRef = useRef();
  const errRef = useRef();

  const [fullName, setfullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setfullNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [validDob, setValidDob] = useState(false);
  const [dobFocus, setdobFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //UseEffect
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  //UI part
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
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
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>

          <div>
            <form className="inputs-form" onSubmit={handleSubmit}>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setfullName(e.target.value)}
                  value={fullName}
                  required
                  aria-invalid={validFullName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setfullNameFocus(true)}
                  onBlur={() => setfullNameFocus(false)}
                />
              </div>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validFullName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </div>
              <div className="input">
                <img src={user_icon} alt="" />

                <input
                  type="date"
                  placeholder="Date of birth"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                  required
                  aria-invalid={validDob ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setdobFocus(true)}
                  onBlur={() => setdobFocus(false)}
                />
              </div>
              <div className="input">
                {/* <label htmlFor="username">
            <FontAwesomeIcon
              className={validUser ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              className={validUser || !user ? "hide" : "invalid"}
            />
          </label> */}
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validUser ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validUser
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                  Must begin with a letter.
                </p>
              </div>
              <div className="input">
                <img src={pwd_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validUser
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                </p>
              </div>
              <div className="input">
                <img src={pwd_icon} alt="" />
                <input
                  type="password"
                  placeholder="Confirm the password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </div>
              <div className="submit-container">
                <button
                  className="submit"
                  disabled={
                    !validUser || !validPwd || !validMatch ? true : false
                  }
                >
                  {/* {Put a router link here} */}
                  <a href="#" className="signUpUnderline">
                    Sign Up
                  </a>
                </button>
              </div>
            </form>
            <div className="forgot-pwd">
              Already have account ?
              <span>
                <a href="" style={{ color: "#9fe1a8", textDecoration: "none" }}>
                  Click here!
                </a>
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default SignUp;

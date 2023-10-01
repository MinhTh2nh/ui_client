import React from "react";
import "./SignUp.css";
import user_icon from "../assests/person.png";
import pwd_icon from "../assests/password.png";
import email_icon from "../assests/email.png";
const SignUp = () => {
  return (
    <section className="container">
      <p
        // ref={errRef}
        // className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {/* {errMsg} */}
      </p>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div>
        <form
          className="inputs-form"
          // onSubmit={handleSubmit}
        >
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              required
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              required
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />

            <input
              type="date"
              placeholder="Date of birth"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              required
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setUser(e.target.value)}
              // value={user}
              required
            />
          </div>

          <div className="input">
            <img src={pwd_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setPwd(e.target.value)}
              // value={pwd}
              required
            />
          </div>
          <div className="input">
            <img src={pwd_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm the password"
              // ref={userRef}
              autoComplete="off"
              // onChange={(e) => setPwd(e.target.value)}
              // value={pwd}
              required
            />
          </div>
          <div className="submit-container">
            <button className="submit">
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
            <a href="" style={{color : "#9fe1a8" , textDecoration : "none"}}>Click here!</a>
          </span>
        </div>
      </div>
    </section>
  );
};
export default SignUp;

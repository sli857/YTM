import React, { useState } from "react";
import axios from "axios";
import "./Loginform.css";
import { encrypt } from "../encrypt/encrypt";
import { SERVERURL } from "../../config/secret";
const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");

  const handleSwitchForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = async () => {
    const encrypted = encrypt(password);
    var form = {
      user: username,
      secret: encrypted,
      remember: remember,
    };
    console.log("Login form:", form);
    //TODO: post login
    const res = await axios.post(`${SERVERURL}/login`, JSON.stringify(form));
    console.log(res);
  };

  const handleSignup = async () => {
    const encrypted = encrypt(password);
    var form = {
      user: username,
      email: email,
      secret: encrypted,
    };
    console.log("Signup form:", form);
    //TODO: post signup
    const res = await axios.post(`${SERVERURL}/signup`, JSON.stringify(form));
    console.log(res);
  };

  return (
    <div className="cover">
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      {isSignup && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
        </>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      {!isSignup && (
        <div className="remember">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="custom-checkbox"
            />
            Remember this device
          </label>
        </div>
      )}
      <div
        className="login-btn"
        onClick={isSignup ? handleSignup : handleLogin}
      >
        {isSignup ? "Signup" : "Login"}
      </div>
      <div className="switch-btn" onClick={handleSwitchForm}>
        {isSignup ? "Switch to Login" : "Switch to Signup"}
      </div>
    </div>
  );
};

export default Loginform;

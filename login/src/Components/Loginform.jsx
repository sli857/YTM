import React, { useState } from "react";
import "./Loginform.css";
import { encrypt } from "../encrypt/encrypt";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const onLogin = () => {
    const encrypted = encrypt(password);
    var form = {
      user: username,
      secret: encrypted,
      remember: remember,
    };
    console.log(form);
    //TODO: post
  };

  return (
    <div className="cover">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
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
      <div className="login-btn" onClick={onLogin}>
        Login
      </div>
    </div>
  );
};

export default Loginform;

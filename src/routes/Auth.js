import React, { useState } from "react";
import {
  authService,
  createUserEmailPassword,
  signInEmailPassword,
  signInPopup,
  google as GoogleAuthProvider,
  github as GithubAuthProvider,
} from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserEmailPassword(authService, email, password);
      } else {
        data = await signInEmailPassword(authService, email, password);
      }
      console.log("DATA:", data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const { name, value } = event.target;
    let provider;
    if (name === "github") {
      provider = new GithubAuthProvider();
    } else if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          onChange={onChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={onChange}
          value={password}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;

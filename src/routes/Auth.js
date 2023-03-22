import { async } from "@firebase/util";
import React, { useState } from "react";
import {
  authService,
  createUserEmailPassword,
  signInEmailPassword,
} from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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
    console.log(newAccount);
    try {
      let data;
      if (newAccount) {
        data = await createUserEmailPassword(authService, email, password);
      } else {
        data = await signInEmailPassword(authService, email, password);
      }
      console.log("DATA:", data);
    } catch (error) {
      console.log("ERROR:", error);
    }
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;

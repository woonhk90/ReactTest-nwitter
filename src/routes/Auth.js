import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const [name, value] = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "passwrod") {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
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
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;

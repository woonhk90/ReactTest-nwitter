import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;

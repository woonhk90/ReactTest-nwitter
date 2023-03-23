import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
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

import React, { useEffect, useState } from "react";
import { dbService, dbAddDoc, dbCollection, dbGetDoc } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await dbGetDoc(dbCollection(dbService, "nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbAddDoc(dbCollection(dbService, "nweets"), {
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
      {nweets.map((v) => (
        <div key={v.id}>
          <h4>{v.nweet}</h4>
        </div>
      ))}
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

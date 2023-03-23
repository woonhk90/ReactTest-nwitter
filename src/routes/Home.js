import React, { useEffect, useState } from "react";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbGetDoc,
  dbSnapshot,
  dbQuery,
} from "../fbase";

const Home = (props) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const query = dbQuery(dbCollection(dbService, "nweets"));
    dbSnapshot(query, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbAddDoc(dbCollection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
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
          <h4>{v.text}</h4>
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

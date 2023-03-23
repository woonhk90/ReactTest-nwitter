import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
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
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((v) => (
        <Nweet
          key={v.id}
          nweetObj={v}
          isOwner={v.creatorId === props.userObj.uid}
        />
      ))}
    </div>
  );
};
export default Home;

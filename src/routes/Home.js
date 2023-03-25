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

  const onFileHandler = (event) => {
    console.log(event);
    const { files } = event.target;
    const theFile = files[0];

    const reader = new FileReader(); // filereader API
    reader.readAsDataURL(theFile); // 파일을 읽음
    // event listener를 reader에 추가
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileHandler} />
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

import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbGetDoc,
  dbSnapshot,
  dbQuery,
  upStorage,
  upRef,
  upPutString,
  upGetDownLoadURL,
} from "../fbase";
import { v4 as uuidv4 } from "uuid";

const Home = (props) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
    let attachmentUrl = "";
    if (attachment) {
      const attachmentRef = upRef(
        upStorage,
        `${props.userObj.uid}/${uuidv4()}`
      );
      const response = await upPutString(attachmentRef, attachment, "data_url");
      attachmentUrl = await upGetDownLoadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentUrl,
    };
    await dbAddDoc(dbCollection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttachment("");
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
    /* ------------------------- 읽기 완료 후 onloadend이벤트 발생 ------------------------ */
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  };
  const onClearAttachment = () => setAttachment(null);
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
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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

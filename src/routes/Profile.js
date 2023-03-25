import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  authService,
  dbCollection,
  dbService,
  dbGetDoc,
  dbWhere,
  dbQuery,
  dbSnapshot,
  dbOrderBy,
  authUpdateProfile,
} from "../fbase";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  /* -------------------------------- 내가 쓴거만 찾기 ------------------------------- */
  const getMyMweets = async () => {
    const query = dbQuery(
      dbCollection(dbService, "nweets"),
      dbWhere("creatorId", "==", `${userObj.uid}`),
      dbOrderBy("createdAt", "desc")
    );
    dbSnapshot(query, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => doc.data());
      console.log(nweetArr);
    });
  };
  /* ----------------- 아래 코드로도 만들어 보기 _ 적용 잘 안돼서 snapshot으로 적용 ---------------- */
  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(nweets.docs.map((doc) => doc.data()));
  // };

  useEffect(() => {
    getMyMweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await authUpdateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };
  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

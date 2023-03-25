import React, { Fragment, useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "./fbase";

function App() {
  const [newName, setNewName] = useState("");
  /* ----------------------------- 로그인하면 유저 정보가 담김 ---------------------------- */
  const [userObj, setUserObj] = useState(null);
  /* ------------------ 로그인 여부 확인 ( authService.currentUser ) ----------------- */
  const [init, setInit] = useState(false);
  useEffect(() => {
    /* ------------------------ 사용자의 로그인 상태의 변화를 관찰하는 관찰자 ----------------------- */
    authService.onAuthStateChanged((user) => {
      // user ? setUserObj(user) : setUserObj(null);
      /* ----------------------- BBBBB: 애초에 필요한 user정보를 담는다 ----------------------- */
      // CCCCC: userInternal.getIdToken is not a function오류로 인해 아래 코드로 수정
      /*user
      ? setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => {
              user.updateProfile(args);
            },
          })
        : setUserObj(null);
        */
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    /* --------- AAAAA: 비어있는object안에 원래user의 사본이 새 object의 형태로 생성되기 때문에 --------- */
    /* --------------------- 새로운 object가 생성됐다고 생각해서 다시 랜더링됨 --------------------- */
    // setUserObj(Object.assign({}, user));
    // CCCCC: userInternal.getIdToken is not a function오류로 인해 아래 코드로 수정
    /*setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => {
        user.updateProfile(args);
      },
    });*/
    setNewName(userObj.displayName);
  };

  return (
    <Fragment>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </Fragment>
  );
}

export default App;

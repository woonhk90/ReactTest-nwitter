import React, { Fragment, useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "./fbase";

function App() {
  /* ----------------------------- 로그인하면 유저 정보가 담김 ---------------------------- */
  const [userObj, setUserObj] = useState(null);
  /* ------------------ 로그인 여부 확인 ( authService.currentUser ) ----------------- */
  const [init, setInit] = useState(false);
  useEffect(() => {
    /* ------------------------ 사용자의 로그인 상태의 변화를 관찰하는 관찰자 ----------------------- */
    authService.onAuthStateChanged((user) => {
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, []);

  return (
    <Fragment>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </Fragment>
  );
}

export default App;

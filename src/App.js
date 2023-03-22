import React, { Fragment, useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "./fbase";

function App() {
  /* ------------------ 로그인 여부 확인 ( authService.currentUser ) ----------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    /* ------------------------ 사용자의 로그인 상태의 변화를 관찰하는 관찰자 ----------------------- */
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <Fragment>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </Fragment>
  );
}

export default App;

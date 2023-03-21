import React, { Fragment, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "./fbase";

function App() {
  /* ------------------ 로그인 여부 확인 ( authService.currentUser ) ----------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <Fragment>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </Fragment>
  );
}

export default App;

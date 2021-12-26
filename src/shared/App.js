import React from "react";
import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import InCategory from "../pages/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import Login from "../pages/Login";
import PortfolioPage from "../pages/PortfolioPage";

import Category from "../pages/Category";
import Search from "../pages/Search";
import MyPage from "../pages/MyPage";
import EditProfile from "../pages/EditProfile";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/" component={Main} exact />
      <Route path="/category" component={Category} exact />
      <Route path="/incategory" component={InCategory} exact />
      <Route path="/search" component={Search} exact />
      <Route path="/login" component={Login} exact />

      <Route path="/edit/base" component={EditBase} exact />
      <Route path="/edit/record" component={EditRecord} exact />

      <Route path="/portfolio" component={PortfolioPage} exact />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/edit/profile" component={EditProfile} />
    </>
  );
}

export default App;

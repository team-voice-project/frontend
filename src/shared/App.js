import React from "react";
import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import InCategory from "../pages/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import EditFinal from "../pages/editTrack/EditFinal";
import Login from "../pages/Login";
import PortfolioPage from "../pages/PortfolioPage";
import Search from "../pages/Search";
import MyPage from "../pages/MyPage";
import EditProfile from "../pages/EditProfile";
import ShareTrack from "../pages/shareTrack/ShareTrack";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/category" component={Category} exact />
      <Route path="/search" component={Search} exact />
      <Route path="/" component={Main} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/edit/base" component={EditBase} exact />
      <Route path="/edit/record" component={EditRecord} exact />
      <Route path="/edit/final" component={EditFinal} exact />
      <Route path="/" component={InCategory} exact />
      <Route path="/portfolio" component={PortfolioPage} exact />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/edit/profile" component={EditProfile} />
      <Route path="/share/:track_id" component={ShareTrack} exact />
    </>
  );
}

export default App;

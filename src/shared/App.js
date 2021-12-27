import React from "react";
import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/main/Main";
import InCategory from "../pages/search/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import EditFinal from "../pages/editTrack/EditFinal";
import Login from "../pages/main/Login";
import PortfolioPage from "../pages/portfolioPage/PortfolioPage";
import Search from "../pages/search/Search";
import MyPage from "../pages/myPage/MyPage";
import EditProfile from "../pages/editProfile/EditProfile";
import ShareTrack from "../pages/shareTrack/ShareTrack";
import Category from "../pages/search/Category";

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
      <Route path="/edit/final" component={EditFinal} exact />
      <Route path="/portfolio" component={PortfolioPage} exact />
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/edit/profile" component={EditProfile} />
      <Route path="/share/:track_id" component={ShareTrack} exact />
    </>
  );
}

export default App;

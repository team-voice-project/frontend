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
import LoginCallback from "../shared/LoginCallback";
import Auth from "../shared/auth";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/" component={Main} exact />
      <Route path="/category" component={Category} exact />
      <Route path="/category/:categoryName" component={InCategory} exact />
      <Route path="/search" component={Search} exact />
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/edit/base" component={Auth(EditBase, true)} exact />
      <Route
        path="/edit/base/:track_id"
        component={Auth(EditBase, true)}
        exact
      />
      <Route path="/edit/record" component={Auth(EditRecord, true)} exact />
      <Route path="/edit/final" component={Auth(EditFinal, true)} exact />
      <Route path="/portfolio" component={Auth(PortfolioPage, true)} exact />
      <Route exact path="/mypage" component={Auth(MyPage, true)} />
      <Route exact path="/edit/profile" component={EditProfile} />
      <Route path="/share/:track_id" component={ShareTrack} exact />
      <Route path="/api/auth/kakao/callback" component={LoginCallback} exact />
      <Route path="/api/auth/naver/callback" component={LoginCallback} exact />
      <Route path="/api/auth/google/callback" component={LoginCallback} exact />
    </>
  );
}

export default App;

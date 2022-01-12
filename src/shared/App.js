import React from "react";
import { Route, Switch } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/main/Main";
import InCategory from "../pages/search/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import EditFinal from "../pages/editTrack/EditFinal";
import Login from "../pages/main/Login";
import PortfolioPage from "../pages/portfolioPage/PortfolioPage";
import Search from "../pages/search/Search";
import SearchKeyword from "../pages/search/SearchKeyword";
import MyPage from "../pages/myPage/MyPage";
import EditProfile from "../pages/editProfile/EditProfile";
import ShareTrack from "../pages/shareTrack/ShareTrack";
import Category from "../pages/search/Category";
import TagCategory from "../pages/search/TagCategory";
import Error from "../pages/main/Error";
import LoginCallback from "../shared/LoginCallback";
import Auth from "../shared/auth";
import ErrorHandlePage from "./ErrorHandlePage";
import GlobalPlayer from "../components/player/GlobalPlayer";
import Footer from "../components/headerFooter/Footer";
import KeywordSearch from "../pages/search/KeywordSearch";

function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalPlayer />
      <Switch>
        <Route path="/" component={Auth(Main, false)} exact />
        <Route path="/category" component={Category} exact />
        <Route path="/category/:categoryName" component={InCategory} exact />
        <Route path="/tagcategory" component={TagCategory} exact />
        <Route path="/error" component={Error} exact />
        <Route path="/searchkeyword" component={SearchKeyword} exact />
        <Route path="/search" component={KeywordSearch} exact />
        <Route path="/login" component={Auth(Login, false)} exact />
        <Route path="/edit/base" component={Auth(EditBase, true)} exact />
        <Route
          path="/edit/base/:track_id"
          component={Auth(EditBase, true)}
          exact
        />
        <Route path="/edit/record" component={Auth(EditRecord, true)} exact />
        <Route path="/edit/final" component={Auth(EditFinal, true)} exact />
        <Route
          path="/portfolio/:userId/"
          component={Auth(PortfolioPage, true)}
          exact
        />
        <Route
          path="/portfolio/:userId/:voice"
          component={Auth(PortfolioPage, true)}
          exact
        />
        <Route path="/mypage/" component={Auth(MyPage, true)} exact />
        <Route path="/mypage/:like" component={Auth(MyPage, true)} exact />
        <Route path="/edit/profile" component={Auth(EditProfile, true)} exact />
        <Route
          path="/edit/profile/:is_first"
          component={Auth(EditProfile, true)}
          exact
        />
        <Route path="/share/:track_id" component={ShareTrack} exact />
        <Route
          path="/api/auth/kakao/callback"
          component={LoginCallback}
          exact
        />
        <Route
          path="/api/auth/naver/callback"
          component={LoginCallback}
          exact
        />
        <Route
          path="/api/auth/google/callback"
          component={LoginCallback}
          exact
        />

        <Route path={"/error/:code"} component={ErrorHandlePage} />
        <Route component={ErrorHandlePage} />
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;

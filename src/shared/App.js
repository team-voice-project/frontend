import React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/configStore";
import { ConnectedRouter } from "connected-react-router";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import InCategory from "../pages/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import Login from "../pages/Login";
import CategoryModal from "../components/CategoryModal";
import PortfolioPage from "../pages/PortfolioPage";

import Category from "../pages/Category";
import Search from "../pages/Search";
import MyPage from "../pages/MyPage";

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
      <Route exact path="/portfolio" component={PortfolioPage} />
      <Route exact path="/mypage" component={MyPage} />
    </>
  );
}

export default App;

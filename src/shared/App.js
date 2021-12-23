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

function App() {
  return (
    <>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/category" exact component={InCategory} />
        <Route path="/search" exact component={Search} />
      </ConnectedRouter>
    </>
  );
}

export default App;

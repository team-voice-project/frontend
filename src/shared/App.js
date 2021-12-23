import React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/configStore";
import { ConnectedRouter } from "connected-react-router";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import Category from "../pages/Category";
import InCategory from "../pages/InCategory";
import Search from "../pages/Search";

function App() {
  return (
    <>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/category" exact component={Category} />
        <Route path="/search" exact component={Search} />
      </ConnectedRouter>
    </>
  );
}

export default App;

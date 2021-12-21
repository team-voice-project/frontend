import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import Header from "../components/Header";
import Category from "../pages/Category";
import OnBoarding from "../pages/OnBoarding";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Route path="/" component={OnBoarding} />
    </>
  );
}

export default App;

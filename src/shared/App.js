import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import Header from "../components/Header";
import Category from "../pages/Category";
import InCategory from "../pages/InCategory";
import Login from "../pages/Login";
import CategoryModal from "../components/CategoryModal";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Route path="/" component={InCategory} />
    </>
  );
}

export default App;

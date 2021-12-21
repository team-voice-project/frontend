import { Route } from 'react-router-dom';

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";

function App() {
  return (
    <>
      <GlobalStyles/>
      <Route path='/' component={Main}/>
    </>
  );
}

export default App;

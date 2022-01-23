import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import Chat from "./modules/chat";
import ChatList from "./modules/chatList";
import Comment from "./modules/comment";
import EditTrack from "./modules/editTrack";
import User from "./modules/user";
import Post from "./modules/post";
import Mypage from "./modules/mypage";
import Search from "./modules/search";
import GlobalPlayer from "./modules/globalPlayer";
import Modal from "./modules/modal";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  modal: Modal,
  chat: Chat,
  chatList: ChatList,
  comment: Comment,
  editTrack: EditTrack,
  user: User,
  post: Post,
  mypage: Mypage,
  search: Search,
  globalPlayer: GlobalPlayer,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어떤 환경인지 알려준다.(개발환경, 프로덕션(배포)환경...)
const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();

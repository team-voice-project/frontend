import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { newGetCookie } from "../shared/Cookie";

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
import ChatList from "../pages/chat/ChatList";
import ChatRoom from "../pages/chat/ChatRoom";

function App() {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.instance);

  useEffect(() => {
    const uid = newGetCookie("uid");
    if (!uid) {
      console.error("[알림] 비로그인 회원은 채팅기능을 사용 할 수 없습니다.");
      return;
    }

    dispatch(chatActions.createSocketInstance());
    
    return () => {
      dispatch(chatActions.destroySocketInstance());
    };
  }, []);

  useEffect(() => {
    const uid = newGetCookie("uid");
    if (!uid) {
      console.error("[알림] 비로그인 회원은 채팅기능을 사용 할 수 없습니다.");
      return;
    }

    chat?.on("list", (data) => {
      console.log("글로벌 메세지", data);
      receiveGlobalMessage(data);
    });
  }, [chat]);

  const receiveGlobalMessage = (new_message) => {
    // TODO: 접속자 고유 아이디와 sender ID 결합하여 room_id 조합 필요
    const { receiveUserId, sendUserId } = new_message;
    const room_id = [receiveUserId, sendUserId.userId]
      .sort((a, b) => a - b)
      .join("");

    // update redux rooms
    const new_data = {
      room_id,
      data: {
        sender: {
          id: new_message.senderUserId,
          nick: "테스터",
        },
        msg: new_message.chatText,
      },
    };

    dispatch(chatActions.updateChatData(new_data));
  };

  return (
    <>
      {/* 배포 테스트 - add release branch */}
      <GlobalStyles />
      <GlobalPlayer />
      <Switch>
        <Route path="/" component={Auth(Main, false)} exact />
        <Route path="/category" component={Category} exact />
        <Route path="/category/:categoryName" component={InCategory} exact />
        <Route path="/tagcategory" component={TagCategory} exact />
        <Route path="/error" component={Error} exact />
        <Route path="/searchkeyword" component={SearchKeyword} exact />
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
        <Route path={"/chatroom/:roomId"} component={ChatRoom} />
        <Route path={"/chat/:id"} component={ChatList} />
        <Route path={"/error/:code"} component={ErrorHandlePage} />
        <Route component={ErrorHandlePage} />
      </Switch>
      <Footer></Footer>
    </>
  );
}

export default App;

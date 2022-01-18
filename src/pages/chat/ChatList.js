import React from "react";
import styled from "styled-components";

import { Font, Container } from "../../elements";
import ChatBlock from "../../components/chat/ChatBlock";
import { newGetCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";

const ChatList = () => {
  // React.useEffect(() => {
  //   const id = newGetCookie("uid");
  //   const userId = id;
  //   console.log(userId);
  //   apis.setChatList(userId).then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    <ChatListWrap>
      <Container>
        <div className={"page-title"}>
          <Font title fontSize={"18px"}>
            채팅
          </Font>
        </div>
      </Container>

      <Container padding={"0"}>
        <div className={"chat-list"}>
          <ul>
            <ChatBlock />
          </ul>
        </div>
      </Container>
    </ChatListWrap>
  );
};

export default ChatList;

const ChatListWrap = styled.section`
  .page-title {
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

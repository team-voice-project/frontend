import React from "react";
import styled from "styled-components";

import { Font, Container } from "../../elements";
import ChatBlock from "../../components/chat/ChatBlock";

const ChatList = () => {
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

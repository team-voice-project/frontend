import React, { useEffect, useState } from "react";
import styled from "styled-components";

import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { Container } from "../../elements";

const RoomBody = ({ my_info, chat_content, show_option_modal }) => {
  console.log("[RoomBody] 대화 정보", chat_content);

  const renderChatContent = (message, i) => {
    const isMe = my_info.userId === message.sendUserId.userId;
    if (isMe) {
      return <RecieverBubble message={message} key={`chat-bubble-${i}`} />;
    } else {
      return <SenderBubble message={message} key={`chat-bubble-${i}`} />;
    }
  };

  if (!chat_content?.length) {
    return (
      <Container>
        <ChatContentWrap>
          <div>대화 정보가 존재하지 않습니다.</div>
        </ChatContentWrap>
      </Container>
    );
  }

  return (
    <ChatContentWrap>
      <Container _className={"chat-body-container"}>
        <ChatContentList show_option_modal={show_option_modal}>
          {/*<DatetimeLine />*/}
          {/*<SenderBubble />*/}
          {/*<RecieverBubble />*/}
          {chat_content.map((message, i) => {
            return renderChatContent(message, i);
          })}
        </ChatContentList>
      </Container>
    </ChatContentWrap>
  );
};

export default RoomBody;
const ChatContentWrap = styled.div`
  .chat-body-container {
    height: 100vh;
  }
`;
const ChatContentList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding-top: 60px;
  padding-bottom: ${({ show_option_modal }) =>
    show_option_modal ? "190px" : "70px"};
`;

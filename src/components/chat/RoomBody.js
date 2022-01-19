import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { Container } from "../../elements";

const RoomBody = ({
  my_info,
  chat_content,
  show_option_modal,
  setRecordModal,
  setRequestText,
}) => {
  console.log("[RoomBody] 대화 정보", chat_content);
  const contentScrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    contentScrollRef.current.scrollTop = contentScrollRef.current.scrollHeight;
  }, [chat_content]);

  const renderChatContent = (message, i) => {
    const isMe = my_info.userId === message.sendUserId.userId;
    console.log(
      "렌더링 될 메시지",
      message,
      my_info.userId,
      message.sendUserId.userId
    );

    if (isMe) {
      return <SenderBubble message={message} key={`chat-bubble-${i}`} />;
    } else {
      return (
        <RecieverBubble
          setRequestText={setRequestText}
          setRecordModal={setRecordModal}
          message={message}
          key={`chat-bubble-${i}`}
        />
      );
    }
  };

  return (
    <ChatContentWrap>
      <Container _className={"chat-body-container"}>
        <ChatContentList
          show_option_modal={show_option_modal}
          ref={contentScrollRef}
        >
          {/*<DatetimeLine />*/}
          {/*<SenderBubble />*/}
          {/*<RecieverBubble />*/}

          {!chat_content?.length ? (
            <NoMessage>대화 기록이 없습니다.</NoMessage>
          ) : (
            chat_content.map((message, i) => {
              return renderChatContent(message, i);
            })
          )}
        </ChatContentList>
      </Container>
    </ChatContentWrap>
  );
};

export default RoomBody;
const ChatContentWrap = styled.div`
  .chat-body-container {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100vh;
  }
`;
const ChatContentList = styled.div`
  overflow-y: auto;
  padding: 0 20px;
  padding-top: 60px;
  padding-bottom: ${({ show_option_modal }) =>
    show_option_modal ? "190px" : "70px"};
`;

const NoMessage = styled.div`
  text-align: center;
  padding-bottom: 30px;
  color: #aaa;
`;

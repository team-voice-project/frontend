import React, { useEffect } from "react";
import styled from "styled-components";

import { Font, Container } from "../../elements";
import ChatBlock from "../../components/chat/ChatBlock";
import { newGetCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";
import { actionCreators as chatListActions } from "../../redux/modules/chatList";
import { useDispatch, useSelector } from "react-redux";

const ChatList = () => {
  const dispatch = useDispatch();
  const userId = newGetCookie("uid");
  const chatList = useSelector((state) => state?.chatList?.chat_list);
  const chat_rooms_info = useSelector((state) => state.chat.rooms);

  useEffect(() => {
    dispatch(chatListActions.setChatBlockData(userId));
  }, []);

  useEffect(() => {
    dispatch(chatListActions.setChatBlockData(userId));
  }, [chat_rooms_info]);

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
            {chatList?.map((p, idx) => {
              return <ChatBlock key={idx} {...p} />;
            })}
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

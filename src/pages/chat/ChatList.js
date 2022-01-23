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
  console.log(chat_rooms_info);
  return (
    <>
      {chatList.length === 0 ? (
        <ChatListWrap>
          <Container>
            <div className={"page-title"}>
              <Font title fontSize={"18px"}>
                채팅
              </Font>
            </div>
          </Container>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <OAODiv>
              <OAOText>채팅목록이 없습니다!</OAOText>
              <OAOText>다른 사람과 채팅을 해보세요!</OAOText>
              <OAO></OAO>
            </OAODiv>
          </div>
        </ChatListWrap>
      ) : (
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
      )}
    </>
  );
};

export default ChatList;
const OAODiv = styled.div`
  position: relative;
  top: 50px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 200px;
  height: 210px;
  margin: 55px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const ChatListWrap = styled.section`
  .page-title {
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

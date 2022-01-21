import React, { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { Container, Spinner } from "../../elements/index";
import { apis } from "../../shared/api";

const RoomBody = ({
  my_info,
  chat_content,
  show_option_modal,
  setRecordModal,
  setRequestText,
  createRoomId,
}) => {
  const contentScrollRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(2);
  const [load, setLoad] = useState(false);
  const [scroll_point, setScrollPoint] = useState(null);

  const totalData = () => {
    const total = [...data, ...chat_content];
    return total;
  };
  const totalChat = totalData();

  const newChatList = () => {
    if (!totalChat) {
      return;
    }
    const newList = totalChat.map((chat, i) => {
      const date = chat.createdAt.split("T")[0];
      const obj = {
        ...chat,
        date: date,
      };
      return obj;
    });
    return newList;
  };
  const newTotalChat = newChatList();

  useEffect(() => {
    contentScrollRef.current.scrollTop = contentScrollRef.current.scrollHeight;
  }, [chat_content]);

  const _handleReverseScroll = _.throttle((e) => {
    const now_scroll = contentScrollRef.current.scrollTop;
    if (now_scroll === 0 && hasMore === true) {
      fetchMoreChatContent();
    }
  }, 250);

  const fetchMoreChatContent = async (room_info, page, chat) => {
    const { uid, another } = createRoomId();
    const roomInfo = { userId: uid, qUserId: another };
    setLoad(true);
    const res = await apis.getChatList(
      (room_info = roomInfo),
      (page = `${pages}`),
      (chat = 20)
    );
    setPages(pages + 1);
    setLoad(false);

    const resData = res.data.getChat;
    setData((data) => [...resData, ...data]);

    if (resData.length === 0 || resData.length < 20) {
      setHasMore(false);
      contentScrollRef.current.scrollTo(0, 0);
    } else {
      contentScrollRef.current.scrollTo(0, 1200);
    }
  };

  const handleReverseScroll = useCallback(_handleReverseScroll, [load]);

  const renderChatContent = (message, i) => {
    if (!my_info) {
      return;
    }
    const isMe = my_info.userId === message.sendUserId.userId;

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
          onScroll={handleReverseScroll}
          id={"chat-list"}
        >
          {/*<DatetimeLine />*/}
          {/*<SenderBubble />*/}
          {/*<RecieverBubble />*/}

          {load === true && <Spinner small />}

          {!chat_content?.length ? (
            <NoMessage>대화 기록이 없습니다.</NoMessage>
          ) : (
            newTotalChat.map((message, i) => {
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
    height: -webkit-fill-available;
  }
`;
const ChatContentList = styled.div`
  overflow-y: auto;
  padding: 0 20px;
  padding-top: 60px;
  padding-bottom: ${({ show_option_modal }) =>
    show_option_modal ? "190px" : "70px"};

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 6px;
    overflow: auto;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--point-color);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #000;
  }
`;

const NoMessage = styled.p`
  text-align: center;
  padding-bottom: 30px;
  color: #aaa;
`;

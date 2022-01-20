import React, { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { Container } from "../../elements";
import { apis } from "../../shared/api";

const RoomBody = ({
  my_info,
  chat_content,
  show_option_modal,
  setRecordModal,
  setRequestText,
  createRoomId,
}) => {
  console.log("[RoomBody] 대화 정보", chat_content);
  const contentScrollRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(2);
  const [load, setLoad] = useState(false);
  const [scroll_point, setScrollPoint] = useState(null);
  const topMessageRef = useRef(null);

  const totalData = () => {
    const total = [...data, ...chat_content];
    return total;
  };
  const totalChat = totalData();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    contentScrollRef.current.scrollTop = contentScrollRef.current.scrollHeight;
  }, [chat_content]);

  useEffect(() => {
    // console.log("지금스크롤위치", contentScrollRef.current.scrollTop);
    // console.log("스크롤 전체", document.documentElement.scrollHeight);
    // console.log("보이는 영역만큼", document.documentElement.clientHeight);
    // console.log("가려진 스크롤", document.documentElement.scrollTop);
    //useState로 페이지의 높이를 담아두기
    //로딩 된 다음 페이지 높이에서 이전 높이 빼기
    //그 값을 현재 스크롤바 위치로 설정
    //페이지1의 스크롤 전체 저장, 페이지2전체스크롤-페이지1전체스크롤
    // contentScrollRef.current.scrollTo(0, 1200);
  }, [totalChat]);

  useEffect(() => {
    // if (scroll_point) {
    //   contentScrollRef.current.scrollTo(
    //     0,
    //     contentScrollRef.current.scrollHeight - scroll_point
    //   );
    // }
    setScrollPoint(contentScrollRef.current.scrollHeight);
    console.log("스크롤 값=>", scroll_point);
    //스크롤
    // console.log(
    //   "스크롤 결과값",
    //   contentScrollRef.current.scrollHeight - scroll_point
    // );
    // contentScrollRef.current.scrollTo(
    //   0,
    //   contentScrollRef.current.scrollHeight - scroll_point
    // );
    //

    // setScrollPoint(null);
  }, [totalChat]);

  const _handleReverseScroll = _.throttle((e) => {
    const now_scroll = contentScrollRef.current.scrollTop;
    console.log("hasMore", hasMore);
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
    // console.log(
    //   "렌더링 될 메시지",
    //   message,
    //   my_info.userId,
    //   message.sendUserId.userId
    // );

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

          {!chat_content?.length ? (
            <NoMessage>대화 기록이 없습니다.</NoMessage>
          ) : (
            totalChat.map((message, i) => {
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

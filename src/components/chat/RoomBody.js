import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import { apis } from "../../shared/api";

import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";
import { Container } from "../../elements";
import { useParams } from "react-router-dom";

const RoomBody = forwardRef(
  ({ my_info, chat_content, show_option_modal, chatData }, ref) => {
    console.log("[RoomBody] 대화 정보", chat_content);
    const contentScrollRef = useRef(null);
    const [chat, setChat] = useState([]);
    const [data, setData] = useState(chatData);
    const [pages, setPages] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const params = useParams();
    console.log("1페이지 데이터", chatData);

    console.log("data", data);

    useEffect(() => {
      if (data && chat_content) {
        const totalChat = () => {
          const total = data.concat(chat_content);
          setChat(total);
        };
        totalChat();
      }
    }, [chat_content, data]);
    console.log("chat", chat);

    useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    useEffect(() => {
      contentScrollRef.current.scrollTop =
        contentScrollRef.current.scrollHeight;
    }, [chat_content]);

    const renderChatContent = (message, i) => {
      const isMe = my_info.userId === message.sendUserId.userId;
      if (isMe) {
        return <RecieverBubble message={message} key={`chat-bubble-${i}`} />;
      } else {
        return <SenderBubble message={message} key={`chat-bubble-${i}`} />;
      }
    };

    const ID = () => {
      if (my_info) {
        const userId = my_info.userId;
        const _quserId = params.roomId.split("_").map((l) => {
          if (Number(l) !== userId) {
            return l;
          }
        });
        const qUserId = Number(_quserId[0]);
        return { userId, qUserId };
      }
    };
    console.log(ID());
    const roomInfo = ID();

    const onScroll = useCallback((values) => {
      if (values.scrollTop === 0 && hasMore === true) {
        console.log("가장 위");

        const fetchChat = async (room_info, page, chat = 20) => {
          const res = await apis.getChatList(
            (room_info = roomInfo),
            (page = `${pages}`),
            chat
          );

          const resData = await res.data.getChat;
          console.log("2페이지가 나오나?", resData);

          // const totalData = chatData.concat(resData);
          // setData(totalData);
          setData((data) => [...data, ...resData]);
          if (resData.length === 0 || resData.length < 20) {
            setHasMore(false);
          }
          setPages(pages + 1);
        };

        return fetchChat();
      }
    });
    console.log("데이터 합쳐지냐", data);
    return (
      <ChatContentWrap>
        <Container _className={"chat-body-container"}>
          <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
            <ChatContentList
              show_option_modal={show_option_modal}
              ref={contentScrollRef}
            >
              {/*<DatetimeLine />*/}
              {/*<SenderBubble />*/}
              {/*<RecieverBubble />*/}

              {chatData && chat.length < 1 ? (
                <>
                  {chatData.map((message, i) => {
                    return renderChatContent(message, i);
                  })}
                </>
              ) : (
                <>
                  {chat.length > 0 ? (
                    <>
                      {chat.map((message, i) => {
                        return renderChatContent(message, i);
                      })}
                    </>
                  ) : (
                    <>
                      {!chat_content?.length ? (
                        <NoMessage>대화 기록이 없습니다.</NoMessage>
                      ) : (
                        chat_content.map((message, i) => {
                          return renderChatContent(message, i);
                        })
                      )}
                    </>
                  )}
                </>
              )}
            </ChatContentList>
          </Scrollbars>
        </Container>
      </ChatContentWrap>
    );
  }
);

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

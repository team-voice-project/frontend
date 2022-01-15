import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../../redux/modules/chat";

import RoomBody from "../../components/chat/RoomBody";
import RoomFooter from "../../components/chat/RoomFooter";
import RoomHeader from "../../components/chat/RoomHeader";

const ChatRoom = (props) => {
  const chat = useSelector((state) => state.chat.instance);

  // useEffect(() => {
  //   console.log("채팅 인스턴스", chat);
  //
  //   chat?.on("chat", (data) => {
  //     console.log("받은 메세지", data);
  //   });
  //
  //   return () => {
  //     chat?.off("chat");
  //   };
  // }, [chat]);

  const handleSendMessage = () => {
    console.log("채팅 보내기");
    chat?.emit("room", {
      userId: 1,
      sendUserId: 2,
      chatText: "보내는 메세지 입니다.",
    });
  };

  return (
    <>
      <RoomHeader topMenu props={props} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <RoomBody />
      </div>
      <button type={"button"} onClick={handleSendMessage}>
        보내기
      </button>
      <RoomFooter />
    </>
  );
};

export default ChatRoom;

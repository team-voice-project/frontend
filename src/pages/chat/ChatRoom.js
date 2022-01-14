import React, { useEffect } from "react";
import RoomBody from "../../components/chat/RoomBody";
import RoomFooter from "../../components/chat/RoomFooter";
import RoomHeader from "../../components/chat/RoomHeader";

import io from "socket.io-client";
const socket = io.connect("http://3.36.111.102", { cors: { origin: "*" } });

const ChatRoom = (props) => {
  useEffect(() => {
    console.log("채팅방 입장");
    socket.emit("joinRoom", { userId: 1, qUserId: 2 });

    socket.on("chat", (data) => {
      console.log("받은 메세지", data);
    });
  }, []);

  const handleSendMessage = () => {
    console.log("채팅 보내기");
    socket.emit("room", {
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

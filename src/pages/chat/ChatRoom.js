import React from "react";
import RoomBody from "../../components/chat/RoomBody";
import RoomFooter from "../../components/chat/RoomFooter";
import RoomHeader from "../../components/chat/RoomHeader";

const ChatRoom = (props) => {
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
      <RoomFooter />
    </>
  );
};

export default ChatRoom;

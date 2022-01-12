import React from "react";
import DatetimeLine from "./DatetimeLine";
import RecieverBubble from "./RecieverBubble";
import SenderBubble from "./SenderBubble";

const RoomBody = () => {
  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: "600px",
        width: "425px",
        padding: "0 10px",
      }}
    >
      <SenderBubble />
      <SenderBubble />
      <RecieverBubble />
      <SenderBubble />
      <RecieverBubble />
      <SenderBubble />
      <SenderBubble />
      <SenderBubble />
      <DatetimeLine />
      <RecieverBubble />
      <SenderBubble />
      <RecieverBubble />
      <SenderBubble />
      <RecieverBubble />
      <SenderBubble />
      <RecieverBubble />
    </div>
  );
};

export default RoomBody;

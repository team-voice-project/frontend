import React from "react";
import styled from "styled-components";
import { formattedKrTime } from "../../shared/utils";

const SenderBubble = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div>
        <ProfileImg src={message.sendUserId.profileImage} />
      </div>
      <SenderDiv>{message.chatText}</SenderDiv>
      <Time>{formattedKrTime(message.createdAt)}</Time>
    </div>
  );
};

export default SenderBubble;

const SenderDiv = styled.div`
  background: white;
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  max-width: 210px;
  border-radius: 0px 10px 10px 10px;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
  position: relative;
  top: 4px;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-left: 5px;
  align-items: end;
`;

import React from "react";
import styled from "styled-components";
import { formattedKrTime } from "../../shared/utils";

const RecieverBubble = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Time>{formattedKrTime(message.createdAt)}</Time>
      <SenderDiv>{message.chatText}</SenderDiv>
    </div>
  );
};

export default RecieverBubble;

const SenderDiv = styled.div`
  background: #f1134e;
  color: white;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  max-width: 210px;
  border-radius: 10px 0px 10px 10px;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-right: 5px;
  align-items: end;
`;

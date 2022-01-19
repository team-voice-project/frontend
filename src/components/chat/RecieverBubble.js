import React from "react";
import styled from "styled-components";
import { formattedKrTime } from "../../shared/utils";

import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { Font } from "../../elements";

const RecieverBubble = ({ message }) => {
  if (message.chatType === "audio") {
    return (
      <AudioBubble>
        <Time>{formattedKrTime(message.createdAt)}</Time>
        <div className={"bubble-content"}>
          <Font title _className={"message-title"}>
            보이스 메시지
          </Font>
          <SingleAudioPlayer audio={message.chatText} />
        </div>
      </AudioBubble>
    );
  }

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

const AudioBubble = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;

  .message-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .bubble-content {
    background: #fff;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    padding: 20px;
    max-width: 210px;
    border-radius: 10px 0px 10px 10px;
    word-break: break-all;
  }

  .request-point {
    color: #8f8f8f;
  }

  .rhap_progress-container {
    display: none;
  }

  .rhap_time {
    position: static;
    display: block;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: var(--point-color);

    &.rhap_total-time {
      display: none;
    }
  }

  .rhap_button-clear {
    svg {
      color: var(--point-color);
    }
  }
`;

const SenderDiv = styled.div`
  background: #f1134e;
  color: white;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  max-width: 210px;
  border-radius: 10px 0px 10px 10px;
  word-break: break-all;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-right: 5px;
  align-items: end;
`;

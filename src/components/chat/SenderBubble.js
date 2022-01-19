import React from "react";
import styled from "styled-components";
import { formattedKrTime } from "../../shared/utils";
import { Font } from "../../elements";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

const SenderBubble = ({ message }) => {
  if (message.chatType === "audio") {
    return (
      <AudioBubble>
        <div>
          <ProfileImg src={message.sendUserId.profileImage} />
        </div>
        <div className={"bubble-content"}>
          <Font title _className={"message-title"}>
            보이스 메시지
          </Font>
          <SingleAudioPlayer audio={message.chatText} />
        </div>
        <Time>{formattedKrTime(message.createdAt)}</Time>
      </AudioBubble>
    );
  }

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

const AudioBubble = styled.div`
  display: flex;
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
  background: white;
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  max-width: 210px;
  border-radius: 0px 10px 10px 10px;
  word-break: break-all;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
  position: relative;
  top: 4px;
  object-fit: cover;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-left: 5px;
  align-items: end;
`;

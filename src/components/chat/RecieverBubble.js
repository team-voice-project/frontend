import React, { useState } from "react";
import styled from "styled-components";
import { formattedKrTime } from "../../shared/utils";

import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { Button, Font } from "../../elements";
import SyncLoader from "react-spinners/SyncLoader";

const RecieverBubble = ({ message, setRecordModal, setRequestText }) => {
  const NO_IMAGE_URL =
    "https://images.squarespace-cdn.com/content/v1/5bd5bff894d71a95eac2b9c8/1547880712040-0I7VMDZMGHXK3EJOYHKB/malecostume-512.png";
  const [loading, setLoading] = useState(true);
  const [image_url, setImageUrl] = useState(message.chatText);

  const completeLoad = () => {
    setLoading(false);
  };

  const getError = () => {
    setImageUrl(NO_IMAGE_URL);
    setLoading(false);
  };

  const handleOpenRecordModal = (sample_text) => {
    setRequestText(sample_text);
    setRecordModal(true);
  };

  // 일반 보이스 메시지
  if (!message?.sample && message.chatType === "audio") {
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

  // 요청 메시지
  if (message?.sample && message.chatText === "샘플요청") {
    return (
      <RequestBubble>
        <div>
          <ProfileImg src={message.sendUserId.profileImage} />
        </div>
        <div className={"bubble-content"}>
          <Font title _className={"message-title"}>
            샘플 요청
          </Font>
          <p className={"request-point"}>{message.sample}</p>

          <div className={"btn-group"}>
            <Button
              _className={"btn record-btn"}
              _onClick={() => handleOpenRecordModal(message.sample)}
            >
              녹음하기
            </Button>
            <Button _className={"btn upload-btn"}>파일첨부</Button>
          </div>
        </div>
        <Time>{formattedKrTime(message.createdAt)}</Time>
      </RequestBubble>
    );
  }

  // 요청에 대한 답장
  if (message?.sample && message.chatType === "audio") {
    return (
      <AudioBubble>
        <div>
          <ProfileImg src={message.sendUserId.profileImage} />
        </div>
        <div className={"bubble-content"}>
          <Font title _className={"message-title"}>
            샘플 요청에 대한 답장
          </Font>
          <p className={"request-point"}>{message.sample}</p>
          <SingleAudioPlayer audio={message.chatText} />
        </div>
        <Time>{formattedKrTime(message.createdAt)}</Time>
      </AudioBubble>
    );
  }

  // 요청에 대한 답장
  if (message.chatType === "image") {
    return (
      <ImageBubble>
        <div>
          <ProfileImg src={message.sendUserId.profileImage} />
        </div>
        <div className={"bubble-content"}>
          <a download href={image_url}>
            <img
              src={image_url}
              alt=""
              title={"클릭해서 다운받기"}
              onLoad={() => completeLoad()}
              onError={getError}
            />
          </a>

          {loading && (
            <div className={"spinner"}>
              <SyncLoader size={6} color={"#fff"} />
            </div>
          )}
        </div>
        <Time>{formattedKrTime(message.createdAt)}</Time>
      </ImageBubble>
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

export default RecieverBubble;

const ImageBubble = styled.div`
  display: flex;
  margin: 20px 0;

  .bubble-content {
    background: var(--point-color);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    max-width: 210px;
    border-radius: 10px 0 10px 10px;
    word-break: break-all;
    overflow: hidden;

    .spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      padding: 20px;
    }

    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const RequestBubble = styled.div`
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
    border-radius: 0 10px 10px 10px;
    word-break: break-all;
  }

  .request-point {
    color: #8f8f8f;
    margin-bottom: 15px;
    text-align: center;
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      padding: 0 10px;
      height: 35px;
      line-height: 37px;
      font-size: 16px;
      background-color: var(--point-color);

      &:first-child {
        margin-right: 4px;
      }
    }
  }
`;

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
    margin-bottom: 15px;
    text-align: center;
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

import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "../../redux/configStore";
import { newGetCookie } from "../../shared/Cookie";
import { actionCreators as chatActions } from "../../redux/modules/chat";

import { Font } from "../../elements";

const ChatBlock = (props) => {
  const dispatch = useDispatch();
  const my_Id = newGetCookie("uid");
  const userId = props.qUserId.userId;
  const sendUserId = props.sendUserId;
  const admin_Id = props.userId;

  const createRoomNumber = () => {
    const total_Id = [my_Id, userId];
    return total_Id
      .map(Number)
      .sort((a, b) => a - b)
      .join("_");
  };

  const roomId = createRoomNumber();

  const handleJoinChatRoom = () => {
    const room_key = roomId.split("_").join("");
    dispatch(chatActions.setReadRoom(room_key));
    history.push(`/chatroom/${roomId}`);
  };

  const createdAt = new Date(props.createdAt);

  function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;

    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }
  const check = props.checkChat;

  return (
    <>
      {check === false && sendUserId !== +admin_Id ? (
        <ChatBlockItem background="#353535" onClick={handleJoinChatRoom}>
          <div className={"chat-profile"}>
            <img src={props.qUserId.profileImage} alt="" />
          </div>
          <div className={"chat-display"}>
            <div className={"display-top"}>
              <div style={{ display: "flex" }}>
                <Font title _className={"user-name"}>
                  {props.qUserId.nickname}
                </Font>
                <div className={"red-point"}></div>
              </div>
              <span className={"last-modified"}>{displayedAt(createdAt)}</span>
            </div>
            <div className={"display-bottom"}>
              <span className={"chat-message"}>{props.chatText}</span>
            </div>
          </div>
        </ChatBlockItem>
      ) : (
        <ChatBlockItem onClick={handleJoinChatRoom}>
          <div className={"chat-profile"}>
            <img src={props.qUserId.profileImage} alt="" />
          </div>
          <div className={"chat-display"}>
            <div className={"display-top"}>
              <Font title _className={"user-name"}>
                {props.qUserId.nickname}
              </Font>
              <span className={"last-modified"}>{displayedAt(createdAt)}</span>
            </div>
            <div className={"display-bottom"}>
              <span className={"chat-message"}>{props.chatText}</span>
            </div>
          </div>
        </ChatBlockItem>
      )}
    </>
  );
};

export default ChatBlock;
Font.defaultProps = {
  background: "",
};

const ChatBlockItem = styled.li`
  padding: 12px 20px;
  display: flex;
  border-top: 1px solid #333333;
  background: ${(props) => props.background};
  cursor: pointer;

  &:active {
    background-color: #353535;
  }

  &.new {
    background-color: #353535;

    .user-name {
      &::after {
        display: block !important;
      }
    }
  }

  .chat-profile {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin-right: 16px;
    flex-shrink: 0;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .chat-display {
    flex: 1;
    width: calc(100% - 54px);

    .display-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      .user-name {
        font-size: 14px;
        position: relative;
        margin-right: 5px;

        &::after {
          content: "";
          display: none;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--point-color);
          position: absolute;
          top: -3px;
          right: -8px;
        }
      }
      .last-modified {
        font-size: 12px;
      }
      .red-point {
        background: #f1134e;
        width: 5px;
        height: 5px;
        border-radius: 50%;
      }
    }
    .display-bottom {
      .chat-message {
        display: block;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 290px;
        width: 100%;
      }
    }
  }
`;

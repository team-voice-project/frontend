import React from "react";
import styled from "styled-components";
import { Font } from "../../elements";
import { history } from "../../redux/configStore";

const ChatBlock = (props) => {
  const my_Id = props.receiveUserId;
  const userId = props.sendUserId.userId;

  const createRoomNumber = () => {
    const total_Id = [my_Id, userId];
    return total_Id
      .map(Number)
      .sort((a, b) => a - b)
      .join("_");
  };

  const roomId = createRoomNumber();

  const handleJoinChatRoom = () => {
    console.log("채팅방 입장");
    history.push(`/chatroom/${roomId}`);
  };
  console.log(props);
  return (
    <ChatBlockItem onClick={handleJoinChatRoom}>
      <div className={"chat-profile"}>
        <img src={props.sendUserId.profileImage} alt="" />
      </div>
      <div className={"chat-display"}>
        <div className={"display-top"}>
          <Font title _className={"user-name"}>
            {props.sendUserId.nickname}
          </Font>
          <span className={"last-modified"}>어제</span>
        </div>
        <div className={"display-bottom"}>
          <span className={"chat-message"}>{props.chatText}</span>
        </div>
      </div>
    </ChatBlockItem>
  );
};

export default ChatBlock;

const ChatBlockItem = styled.li`
  padding: 12px 20px;
  display: flex;
  border-top: 1px solid #333333;
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

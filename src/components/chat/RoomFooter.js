import React, { useEffect } from "react";
import styled from "styled-components";

import { Container } from "../../elements";
import { IoIosSend } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SendOptions from "./SendOptions";
import { IoIosClose } from "react-icons/io";

const RoomFooter = ({ sendMessage, show_option_modal, setOptionModal }) => {
  const [content, setCotentText] = React.useState("");

  useEffect(() => {}, [content]);

  const onChange = (e) => {
    setCotentText(e.target.value);
  };

  // const comment = document.querySelectorAll(".commentInput");
  // const commetReset = () => {
  //   Array.from(comment).map((p) => {
  //     p.value = "";
  //   });
  // };

  const handleSendMessage = () => {
    if (!content.trim().length) {
      return;
    }

    sendMessage(content);
    setCotentText("");
  };

  const handleWithKeyboardSend = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChatFooter>
      <Container padding={"0"}>
        <List>
          <div
            onClick={() => {
              setOptionModal(!show_option_modal);
            }}
          >
            {show_option_modal ? (
              <IoIosClose
                style={{
                  marginRight: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <AiOutlinePlus
                style={{
                  marginRight: "10px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          <div style={{ width: "95%" }}>
            <CommentInput
              className="commentInput"
              type="text"
              placeholder="메시지를 입력해주세요."
              onChange={onChange}
              value={content}
              onKeyUp={handleWithKeyboardSend}
            />
          </div>
          <div>
            <IoIosSend
              className={`send-btn ${!content.length ? "disabled" : ""}`}
              onClick={handleSendMessage}
              disabled={!content.length}
            />
          </div>
        </List>
        {show_option_modal && <SendOptions />}
      </Container>
    </ChatFooter>
  );
};

const ChatFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  .send-btn {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
    color: var(--point-color);

    &.disabled {
      pointer-events: none;
      color: #f0f8ff;
    }
  }
`;

const List = styled.div`
  display: flex;
  width: 100%;
  background: #2c2b2b;
  height: 70px;
  padding: 0 20px;
  max-width: 425px;
  align-items: center;
  margin: 10px auto 0px;
`;

const CommentInput = styled.input`
  padding: 0 0 0 5px;
  height: 35px;
  background: none;
  width: 100%;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  color: white;
  margin-right: 5px;
  &:focus {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    border-color: #f1134e;
  }
`;

export default RoomFooter;

import React from "react";
import styled from "styled-components";
import { actionCreators as commentCreators } from "../../redux/modules/comment";
import { IoIosSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import SendOptions from "./SendOptions";
import { IoIosClose } from "react-icons/io";

const RoomFooter = (props) => {
  const [content, setCotentText] = React.useState();
  const [options, setOptions] = React.useState(true);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setCotentText(e.target.value);
  };
  const comment = document.querySelectorAll(".commentInput");
  const commetReset = () => {
    Array.from(comment).map((p) => {
      p.value = "";
    });
  };

  return (
    <>
      {options ? (
        <List>
          <div
            onClick={() => {
              setOptions(false);
            }}
          >
            <AiOutlinePlus
              style={{
                marginRight: "10px",
                fontSize: "13px",
              }}
            />
          </div>
          <div style={{ width: "95%" }}>
            <CommentInput
              className="commentInput"
              type="text"
              placeholder="메시지를 입력해주세요."
              onChange={onChange}
            />
          </div>
          <div>
            <IoIosSend
              type="submit"
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            ></IoIosSend>
          </div>
        </List>
      ) : (
        <>
          <List>
            <div
              onClick={() => {
                setOptions(true);
              }}
            >
              <IoIosClose
                style={{
                  marginRight: "10px",
                  fontSize: "20px",
                }}
              />
            </div>
            <div style={{ width: "95%" }}>
              <CommentInput
                className="commentInput"
                type="text"
                placeholder="메시지를 입력해주세요."
                onChange={onChange}
              />
            </div>
            <div>
              <IoIosSend
                type="submit"
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              ></IoIosSend>
            </div>
          </List>
          <SendOptions />
        </>
      )}
    </>
  );
};

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

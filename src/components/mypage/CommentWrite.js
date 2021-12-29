import React from "react";
import styled from "styled-components";
import { actionCreators as commentCreators } from "../../redux/modules/comment";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

// import { actionCreators as commentCreators } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const [content, setCotentText] = React.useState();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  const onChange = (e) => {
    setCotentText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    e.target[0].value = "";
    dispatch(commentCreators.addCommentDB(`${props.props.trackId}`, content));
  };
  return (
    <List>
      <form
        onClick={(e) => {
          console.log(e);
        }}
        style={{ display: "flex", width: "100%" }}
        onSubmit={onSubmit}
      >
        <div style={{ width: "95%" }}>
          <CommentInput
            value=""
            type="text"
            placeholder="댓글 내용을 입력해주세요 :)"
            onChange={onChange}
          />
        </div>
        <div>
          <IoIosSend
            className="sendBtn"
            type="submit"
            style={{ width: "35px", height: "35px", color: "red" }}
            onClick={(e) => {
              dispatch(
                commentCreators.addCommentDB(`${props.props.trackId}`, content)
              );
            }}
          ></IoIosSend>
        </div>
      </form>
    </List>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  .sendbtn: {
    color: "red";
    background: "red";
  }
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

export default CommentWrite;

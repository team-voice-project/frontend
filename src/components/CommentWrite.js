import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as commentCreators } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const [content, setCotentText] = React.useState();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
  const onChange = (e) => {
    setCotentText(e.target.value);
  };

  return (
    <List>
      <CommentInput
        type="text"
        placeholder="  댓글 내용을 입력해주세요 :)"
        onChange={onChange}
      />
      <button
        style={{ width: "35px", height: "35px" }}
        // onClick={() => {
        //   dispatch(
        //     commentCreators.addCommentDB(
        //       `${props.postId}`,
        //       content,
        //       user.nickname
        //     )
        //   );
        // }}
      >
        ✏️
      </button>
    </List>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CommentInput = styled.input`
  height: 35px;
  background: none;
  width: 100%;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  margin-right: 5px;
`;

export default CommentWrite;

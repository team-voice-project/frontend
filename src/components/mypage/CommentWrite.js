import React from "react";
import styled from "styled-components";
import { actionCreators as commentCreators } from "../../redux/modules/comment";
import { actionCreators as postActions } from "../../redux/modules/post";
import { IoIosSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { apis } from "../../shared/api";
import { actionCreators } from "../../redux/modules/mypage";

const CommentWrite = (props) => {
  const [content, setCotentText] = React.useState();
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
  const setTrack = () => {
    apis.getProfile().then((res) => {
      const userId = res.data.user.userId;
      dispatch(actionCreators.setTrackDB(userId));
    });
  };
  const setMainTrack = () => {
    dispatch(postActions.loadPostDB());
  };

  return (
    <List>
      <div style={{ width: "95%" }}>
        <CommentInput
          className="commentInput"
          type="text"
          placeholder="댓글 내용을 입력해주세요 :)"
          onChange={onChange}
        />
      </div>
      <div>
        <IoIosSend
          type="submit"
          style={{ width: "35px", height: "35px", cursor: "pointer" }}
          onClick={(e) => {
            dispatch(
              commentCreators.addCommentDB(`${props.props.trackId}`, content)
            );
            commetReset();
            setTrack();
            setMainTrack();
          }}
        ></IoIosSend>
      </div>
    </List>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
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

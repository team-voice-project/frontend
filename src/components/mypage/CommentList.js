import React from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { newGetCookie } from "../../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentList = (props) => {
  const nick = newGetCookie("nick");
  const isMe = props.User?.nickname === nick;
  const dispatch = useDispatch();
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

  return (
    <React.Fragment>
      <List>
        <InnerList>
          <CommentStyle margin="10px 0px" width="100%">
            <CommentProfile>
              <ImageCircle src={props.User?.profileImage} />
              <div style={{ maxWidth: "300px", wordBreak: "break-all" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NickName>{props.User?.nickname}</NickName>
                  <TimeName>{displayedAt(createdAt)}</TimeName>
                </div>
                <Text>{props.comment}</Text>
              </div>
            </CommentProfile>

            {isMe && (
              <IoIosClose
                onClick={() => {
                  dispatch(
                    commentActions.deleteCommentDB(
                      props.props.trackId,
                      props.commentId
                    )
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </CommentStyle>
        </InnerList>
      </List>
    </React.Fragment>
  );
};

const CommentStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
`;

const ImageCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-image: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  margin: 4px;
  margin-right: 10px;
`;

const List = styled.div`
  display: flex;
  padding: 0px;
`;

const InnerList = styled.div`
  margin: 10px 0px;
  width: 100%;
`;
const Text = styled.p`
  margin-right: 10px;
  font-size: 17px;
  color: white;
`;
const NickName = styled.p`
  margin-right: 10px;
  font-size: 14px;
  color: #aeaeae;
`;
const TimeName = styled.p`
  margin-right: 10px;
  font-size: 10px;
  color: #aeaeae;
`;
export default CommentList;

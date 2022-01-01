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
  console.log(props);
  return (
    <React.Fragment>
      <List>
        <InnerList>
          <CommentStyle margin="10px 0px" width="100%">
            <CommentProfile>
              <ImageCircle src={props.user_image} />
              <Text>{props.User.nickname} : </Text>
              <Text>{props.comment}</Text>
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
                sx={{ color: "red", cursor: "pointer" }}
              />
            )}
          </CommentStyle>
        </InnerList>
      </List>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  nickname: "YYZA",
  content: "목소리가 너무 좋다...",
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
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
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
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
  color: white;
`;
export default CommentList;

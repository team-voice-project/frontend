import React from "react";
import styled from "styled-components";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { actionCreators as commentActions } from "../redux/modules/comment";

import { useSelector } from "react-redux";

const CommentList = (props) => {
  const state = useSelector((state) => state.comment.comments);

  // const state = useSelector((state) => state.user.user);
  // const isMe = state?.email === props.email || state?.username === props.email;
  // const dispatch = useDispatch();

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

            {/* {isMe && (
              <DeleteForeverIcon
                onClick={() => {
                  dispatch(
                    commentActions.deleteCommentDB(
                      props.postId,
                      props.commentId
                    )
                  );
                }}
                sx={{ color: "red", cursor: "pointer" }}
              />
            )} */}
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

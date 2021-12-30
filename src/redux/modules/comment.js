import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import { RiChatDeleteFill } from "react-icons/ri";

const ADD_COMMENT = "ADD_COMMENT";

const initialState = {
  comment: null,
  comments: [],
};
const addComment = createAction(ADD_COMMENT, (trackId, comment) => ({
  trackId,
  comment,
}));

// const deleteCommentDB = (postId, commentId) => {
//   return function (dispatch, getState, { history }) {
//     const cookie = getCookie('x_auth')
//     axios
//       .delete(`http://3.36.100.253/api/${postId}/${commentId}`, {
//         headers: {
//           Authorization: cookie,
//         },
//       })
//       .then((res) => {
//         dispatch(postActions.deleteComment(commentId, postId))
//       })
//   }
// }

const addCommentDB = (trackId, comment) => {
  return function (dispatch, getState, { history }) {
    apis.commentTrack(trackId, comment).then((res) => {
      console.log(res);
      dispatch(addComment(trackId, res.data.comment));
    });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.comments = [action.payload.comment];
      }),
    // [DELETE_COMMENT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.map((el) =>
    //       el.postId === parseInt(action.payload.postId)
    //         ? (el.commentList = el.commentList.filter(
    //             (e) => e.commentId !== parseInt(action.payload.commentId)
    //           ))
    //         : el
    //     )
    //   }),
  },
  initialState
);
const actionCreators = {
  addCommentDB,
};

export { actionCreators };

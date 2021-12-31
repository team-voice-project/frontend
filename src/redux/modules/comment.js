import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const initialState = {
  comment: null,
  comments: [],
};
const addComment = createAction(ADD_COMMENT, (trackId, comment) => ({
  trackId,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (tracksId, commentId) => ({
  tracksId,
  commentId,
}));

const deleteCommentDB = (tracksId, commentId) => {
  return function (dispatch, getState, { history }) {
    const tracksId = 1;
    apis.deleteComment(tracksId, commentId).then((res) => {
      dispatch(deleteComment(tracksId, commentId));
    });
    window.location.reload();
  };
};

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
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.comment);
        draft.comments.map((el) =>
          el.postId === parseInt(action.payload.postId)
            ? (el.commentList = el.commentList.filter(
                (e) => e.commentId !== parseInt(action.payload.commentId)
              ))
            : el
        );
      }),
  },
  initialState
);
const actionCreators = {
  addCommentDB,
  deleteCommentDB,
};

export { actionCreators };

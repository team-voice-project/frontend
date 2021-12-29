import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const LOAD_POST = "LOAD_POST";
const SEARCH_LOADING = "SEARCH_LOADING";

const loadPost = createAction(LOAD_POST, (post) => ({ post }));
const searchLoading = createAction(SEARCH_LOADING, (search_loading) => ({
  search_loading,
}));

const initialState = {};

//middleware

const loadPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis.mainPage().then((res) => {
      console.log("콘솔여기야", res);
      dispatch(loadPost(res.data.categoryTracks));
    });
  };
};

//reducer
export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post;
      }),
    [SEARCH_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.search_loading = action.payload.search_loading;
      }),
  },
  initialState
);

const actionCreators = {
  loadPost,
  loadPostDB,
};

export { actionCreators };

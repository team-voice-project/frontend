import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const LOAD_POST = "LOAD_POST";
const SEARCH_LOADING = "SEARCH_LOADING";
const LOAD_IMAGE = "LOAD_IMAGE";

const loadPost = createAction(LOAD_POST, (post) => ({ post }));
const searchLoading = createAction(SEARCH_LOADING, (search_loading) => ({
  search_loading,
}));
const loadImage = createAction(LOAD_IMAGE, (listInfo) => ({ listInfo }));

const initialState = {};

//middleware
const loadPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis.mainPage().then((res) => {
      dispatch(loadPost(res.data.categoryTracks));
    });
  };
};

const loadImageDB = () => {
  return function (dispatch, getState, { history }) {
    apis.getMenuInfoDB().then((res) => {
      dispatch(loadImage(res.data));
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
    [LOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.Image_list = action.payload.listInfo.category;
        draft.tag_list = action.payload.listInfo.tag;
      }),
  },
  initialState
);

const actionCreators = {
  loadPost,
  loadPostDB,
  loadImageDB,
};

export { actionCreators };

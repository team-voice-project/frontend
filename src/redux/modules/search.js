import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";
const LOAD_CATEGORY = "LOAD_CATEGORY";
const DELETE_TAG = "DELETE_TAG";

const initialState = {
  keyword: null,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({ search_list }));
const loadCategory = createAction(LOAD_CATEGORY, (category) => ({ category }));
const deleteTag = createAction(DELETE_TAG, (tag) => ({ tag }));

//middleware
const getSearchDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    apis.search(keyword).then((res) => {
      console.log(res);
      dispatch(getSearch(res));
    });
  };
};

const loadCategoryDB = (category, tag1 = "", tag2 = "", tag3 = "") => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3)
      .then((res) => {
        localStorage.setItem("tag1", tag1);
        localStorage.setItem("tag2", tag2);
        localStorage.setItem("tag3", tag3);
        dispatch(loadCategory(res.data.tracks));
      })
      .catch((err) => {
        const errmsg = err.response.data;
        console.log(errmsg);
        history.push("/err");
      });
  };
};

const deleteTagSession = () => {
  return function (dispatch, getState, { history }) {
    sessionStorage.removeItem("tag1");
    sessionStorage.removeItem("tag2");
    sessionStorage.removeItem("tag3");
  };
};

//reducer
export default handleActions(
  {
    [SET_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keyword = action.payload.keyword;
      }),
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        // draft.keyword = action.payload.keyword;
      }),
    [LOAD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        console.log("어휴 증말", action.payload);
        draft.category_list = action.payload.category;
      }),
  },
  initialState
);

const actionCreators = {
  setKeyword,
  getSearchDB,
  loadCategoryDB,
  deleteTagSession,
};

export { actionCreators };

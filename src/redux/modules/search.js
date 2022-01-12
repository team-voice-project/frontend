import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";
const LOAD_CATEGORY = "LOAD_CATEGORY";
const LOADING = "LOADING";

const initialState = {
  keyword: null,
  list: [],
  page: 0,
  has_more: false,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({
  search_list,
}));
const loadCategory = createAction(LOAD_CATEGORY, (category) => ({ category }));

//middleware
const getSearchDB = (keyword, page = 0, track = 12) => {
  return function (dispatch, getState, { history }) {
    apis.search(keyword, page, track).then((res) => {
      console.log("res", res);
      let is_next = null;
      if (res.data.tracks.length < 12) {
        is_next = false;
      } else {
        res.data.tracks.pop();
        is_next = true;
      }
      let search_data = {
        searchLists: res.data.tracks,
        page: page + 1,
        next: is_next,
      };
      dispatch(getSearch(search_data));
    });
  };
};

const loadCategoryDB = (
  category,
  tag1 = "",
  tag2 = "",
  tag3 = "",
  page = 1,
  track = 12
) => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3, page, track)
      .then((res) => {
        dispatch(loadCategory(res.data.tracks));
      })
      .catch((err) => {
        console.log("에러", err);
        const errmsg = err.response.data;
        console.log(errmsg);
        history.push("/error");
      });
  };
};

const loadTagDB = (category, tag1 = "", tag2 = "", tag3 = "", page, track) => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3, (page = 1), (track = 12))
      .then((res) => {
        const tags = [`${tag1}`, `${tag2}`, `${tag3}`];
        dispatch(loadCategory(res.data.tracks));
        history.push({
          pathname: "/tagCategory",
          state: { category: category, tag: tags },
        });
      })
      .catch((err) => {
        console.log("에러", err);
        const errmsg = err.response.data;
        console.log(errmsg);
        history.push("/error");
      });
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
        console.log("액션페이로드", action.payload);
        draft.search_list = action.payload.search_list;
      }),
    [LOAD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.category.tracks;
        draft.tags = action.payload.category.categoryTags;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setKeyword,
  getSearchDB,
  loadCategoryDB,
  loadTagDB,
};

export { actionCreators };

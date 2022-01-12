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
  paging: { start: null, next: null, track: 3 },
  is_loading: false,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list, paging) => ({
  search_list,
  paging,
}));
const loadCategory = createAction(LOAD_CATEGORY, (category) => ({ category }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//middleware
const getSearchDB = (keyword, page = 0, track = 3, start = null) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    apis.search(keyword, page, (track = track + 1)).then((res) => {
      if (start) {
        let page = page + 1;
      }
      let paging = {
        start: res.data.tracks[0],
        next:
          res.data.tracks.length === track + 1
            ? res.data.tracks[res.data.tracks.length - 1]
            : null,
        track: track,
      };
      const a = res.data.tracks.pop();
      dispatch(getSearch(res.data.tracks, paging));
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
        draft.search_list = action.payload.search_list;
        draft.paging = action.payload.paging;
        draft.is_loading = false;
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

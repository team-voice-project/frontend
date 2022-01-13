import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";
const LOAD_CATEGORY = "LOAD_CATEGORY";
const LOADING = "LOADING";
const RESET = "RESET";

const initialState = {
  keyword: null,
  list: [],
  page: 1,
  has_more: false,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({
  search_list,
}));
const loadCategory = createAction(LOAD_CATEGORY, (category) => ({ category }));
const resetdata = createAction(RESET, (list) => ({ list }));

//middleware
const getSearchDB = (keyword, page, track = 12) => {
  return function (dispatch, getState, { history }) {
    apis.search(keyword, page, track).then((res) => {
      let is_next = null;
      if (res.data.tracks.length < 12) {
        is_next = false;
      } else {
        is_next = true;
      }
      let search_list = {
        searchLists: res.data.tracks,
        page: page + 1,
        next: is_next,
      };
      dispatch(getSearch(search_list));
    });
  };
};

const loadCategoryDB = (
  category,
  tag1 = "",
  tag2 = "",
  tag3 = "",
  page,
  track = 12
) => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3, page, track)
      .then((res) => {
        let is_next = null;
        if (res.data.tracks.tracks.length < 12) {
          is_next = false;
        } else {
          is_next = true;
        }
        let category_list = {
          categoryList: res.data.tracks,
          page: page + 1,
          next: is_next,
        };
        dispatch(loadCategory(category_list));
      })
      .catch((err) => {
        console.log("에러", err);
        const errmsg = err.response.data;
        console.log(errmsg);
        history.push("/error");
      });
  };
};

const loadTagDB = (
  category,
  tag1 = "",
  tag2 = "",
  tag3 = "",
  page,
  track = 12
) => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3, page, track)
      .then((res) => {
        console.log("res", res);
        const tags = [`${tag1}`, `${tag2}`, `${tag3}`];
        let is_next = null;
        if (res.data.tracks.tracks.length < 12) {
          is_next = false;
        } else {
          is_next = true;
        }
        let category_list = {
          categoryList: res.data.tracks,
          page: page + 1,
          next: is_next,
        };
        dispatch(loadCategory(category_list));
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
        draft.list.push(...action.payload.search_list.searchLists);
        // draft.search_list = action.payload.search_list.searchLists;
        draft.has_more = action.payload.search_list.next;
        draft.page = action.payload.search_list.page;
      }),
    [LOAD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        console.log("액션페이로드", action.payload);

        draft.list.push(...action.payload.category.categoryList.tracks);
        draft.has_more = action.payload.category.next;
        draft.page = action.payload.category.page;
        draft.tags = action.payload.category.categoryTags;
      }),
    [RESET]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
        draft.page = 1;
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
  resetdata,
};

export { actionCreators };

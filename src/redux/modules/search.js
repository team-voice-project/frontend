import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";
const LOAD_CATEGORY = "LOAD_CATEGORY";

const initialState = {
  keyword: null,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({ search_list }));
const loadCategory = createAction(LOAD_CATEGORY, (list) => ({ list }));

//middleware
const getSearchDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    apis.search(keyword).then((res) => {
      console.log(res);
      dispatch(getSearch(res));
    });
  };
};

const loadCategoryDB = (category, tag1, tag2, tag3) => {
  return function (dispatch, getState, { history }) {
    apis.category(category, tag1, tag2, tag3).then((res) => {
      console.log(res);
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
        // draft.keyword = action.payload.keyword;
      }),
  },
  initialState
);

const actionCreators = {
  setKeyword,
  getSearchDB,
  loadCategoryDB,
};

export { actionCreators };

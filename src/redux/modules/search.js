import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";

const initialState = {
  keyword: null,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({ search_list }));

//middleware
const getSearchDB = (keyword) => {
  console.log("키워드", keyword);
  return function (dispatch, getState, { history }) {
    apis.search(keyword).then((res) => {
      dispatch(getSearch(res));
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
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/api";

const SET_CHATBLOCK = "SET_CHATBLOCK";

const setChatBlock = createAction(SET_CHATBLOCK, (chat_list) => ({
  chat_list,
}));

const initialState = {
  chat_list: [],
};

//middleware
const setChatBlockData = (userId) => {
  return (dispatch, getState, { history }) => {
    apis.setChatList(userId).then((res) => {
      dispatch(setChatBlock(res.data.result));
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_CHATBLOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = action.payload.chat_list;
      }),
  },
  initialState
);

const actionCreators = {
  setChatBlockData,
};

export { actionCreators };

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
      console.log("채팅 리스트 불러오기 => ", userId, res);
      dispatch(setChatBlock(res.data.result));
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_CHATBLOCK]: (state, action) =>
      produce(state, (draft) => {
        console.log("채팅 리스트 정보: ", action.payload.chat_list);
        draft.chat_list.push(action.payload.chat_list);
      }),
  },
  initialState
);

const actionCreators = {
  setChatBlockData,
};

export { actionCreators };

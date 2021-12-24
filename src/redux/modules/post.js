import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const LOAD_POST = "LOAD_POST";

const loadPost = createAction(LOAD_POST, (post) => ({ post }));

//middleware

const loadpostDB = () => {
  return async function (dispatch, useState, { history }) {
    await apis.myPage.then((res) => {
      console.log(res);
    });
  };
};

//reducer
export default handleActions({
  [LOAD_POST]: (state, action) => produce(state, (draft) => {}),
});

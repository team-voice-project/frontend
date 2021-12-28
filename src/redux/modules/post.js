import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const LOAD_TRACK = "LOAD_TRACK";

const loadTrack = createAction(LOAD_POST, (track_list) => ({ track_list }));

//middleware

const loadTrackDB = () => {
  return async function (dispatch, useState, { history }) {
    await apis.myPage.then((res) => {
      console.log(res);
    });
  };
};

//reducer
export default handleActions({
  [LOAD_TRACK]: (state, action) => produce(state, (draft) => {}),
});

const actionCreators = {
  loadTrack,
  loadTrackDB,
};

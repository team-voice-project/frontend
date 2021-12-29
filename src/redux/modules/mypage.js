import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_TRACK = "SET_TRACK";

const initialState = {
  track: "",
};

const setTrack = createAction(SET_TRACK, (track_info) => ({ track_info }));

// middlewares
const setTrackDB = () => {
  return (dispatch, getState, { history }) => {
    const userId = 1;
    apis.myPage(userId).then((res) => {
      console.log(res);
      dispatch(setTrack(res.data.tracks));
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_TRACK]: (state, action) =>
      produce(state, (draft) => {
        draft.track = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  setTrackDB,
};

export { actionCreators };

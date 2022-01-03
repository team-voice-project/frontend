import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_TRACK = "SET_TRACK";
const SET_PROFILE = "SET_PROFILE";

const initialState = {
  track: "",
  user_info: "",
};

const setTrack = createAction(SET_TRACK, (track_info) => ({ track_info }));
const setUser = createAction(SET_PROFILE, (user_info) => ({ user_info }));

// middlewares
const setTrackDB = (userId) => {
  return (dispatch, getState, { history }) => {
    apis.myPage(userId).then((res) => {
      dispatch(setTrack(res.data.results));
      dispatch(setUser(res.data.userDate));
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
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  setTrackDB,
};

export { actionCreators };

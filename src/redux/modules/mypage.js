import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_TRACK = "SET_TRACK";
const SET_PROFILE = "SET_PROFILE";
const SET_LIKELIST = "SET_LIKELIST";

const initialState = {
  track: "",
  user_info: "",
  like_track: "",
};

const setTrack = createAction(SET_TRACK, (track_info) => ({ track_info }));
const setUser = createAction(SET_PROFILE, (user_info) => ({ user_info }));
const setLikelist = createAction(SET_LIKELIST, (like_track) => ({
  like_track,
}));
// middlewares
const setTrackDB = (userId) => {
  return (dispatch, getState, { history }) => {
    apis.myPage(userId).then((res) => {
      dispatch(setTrack(res.data.results));
      dispatch(setUser(res.data.userDate));
      dispatch(setLikelist(res.data.likesArray));
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
    [SET_LIKELIST]: (state, action) =>
      produce(state, (draft) => {
        draft.like_track = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  setTrackDB,
};

export { actionCreators };

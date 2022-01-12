import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_TRACK = "SET_TRACK";
const SET_PROFILE = "SET_PROFILE";
const SET_LIKELIST = "SET_LIKELIST";
const SET_RANKDATA = "SET_RANKDATA";

const initialState = {
  track: "",
  user_info: "",
  like_track: "",
  rank_data: "",
};

const setTrack = createAction(SET_TRACK, (track_info) => ({ track_info }));
const setUser = createAction(SET_PROFILE, (user_info) => ({ user_info }));
const setLikelist = createAction(SET_LIKELIST, (like_track) => ({
  like_track,
}));
const setRankdata = createAction(SET_RANKDATA, (rank_data) => ({
  rank_data,
}));
// middlewares
const setTrackDB = (userId) => {
  return (dispatch, getState, { history }) => {
    apis.myPage(userId).then((res) => {
      dispatch(setRankdata(res.data.tong_gye));
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
    [SET_RANKDATA]: (state, action) =>
      produce(state, (draft) => {
        draft.rank_data = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  setTrackDB,
};

export { actionCreators };

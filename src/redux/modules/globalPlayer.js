import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import _ from "lodash";
import { apis } from "../../shared/api";
import { newGetCookie } from "../../shared/Cookie";
import {
  setSessionPlaylist,
  getSessionPlaylist,
  clearSessionPlaylist,
} from "../../shared/utils";

const SET_PLAYER = "SET_PLAYER";
const SET_MODE = "SET_MODE";
const ADD_TRACK = "ADD_TRACK";
const DELETE_TRACK = "DELETE_TRACK";
const NOW_TRACK = "NOW_TRACK";
const SET_PLAY_LIST = "SET_PLAY_LIST";
const CLEAR_PLAY_LIST = "CLEAR_PLAY_LIST";

const initialState = {
  playerInstance: null,
  play_list: [],
  now_track: {},
  mode: "stop",
};

const setPlayer = createAction(SET_PLAYER, (instance) => ({ instance }));
const addTrack = createAction(ADD_TRACK, (track) => ({ track }));
const deleteTrack = createAction(DELETE_TRACK, (track_src) => ({ track_src }));
const nowTrack = createAction(NOW_TRACK, (track) => ({ track }));
const setPlayList = createAction(SET_PLAY_LIST, (play_list) => ({
  play_list,
}));
const setMode = createAction(SET_MODE, (mode) => ({ mode }));

const clearPlayList = createAction(CLEAR_PLAY_LIST, () => ({}));

// middlewares
const play = (track) => {
  return async (dispatch, getState, { history }) => {
    const player = getState().globalPlayer.playerInstance;
    console.log("재생될 현재트랙 정보:  ", track);
    dispatch(addTrack(track));
    dispatch(nowTrack(track));
    dispatch(setMode("play"));

    if (player.readyState === 0 || player.ended) {
      player.load();
    } else {
      player.play();
    }
  };
};

const stop = () => {
  return async (dispatch, getState, { history }) => {
    const player = getState().globalPlayer.playerInstance;
    dispatch(setMode("stop"));
    player.pause();
  };
};

const loadPlayList = () => {
  return async (dispatch, getState, { history }) => {
    const nick = newGetCookie("nick");
    const token = newGetCookie("token");
    const is_login = Boolean(nick && token);

    const session_playlist = getSessionPlaylist();
    if (is_login) {
      try {
        const res = await apis.getPlayList();
        dispatch(setPlayList(res.data.playlist));
        console.log("플레이 리스트 불러오기 성공", res);
      } catch (err) {
        console.log("플레이 리스트 불러오기 실패", err.response);
      }
    } else if (session_playlist) {
      dispatch(setPlayList(session_playlist));
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_PLAYER]: (state, action) =>
      produce(state, (draft) => {
        if (draft.playerInstance) {
          return;
        }

        draft.playerInstance = action.payload.instance;
      }),

    [ADD_TRACK]: (state, action) =>
      produce(state, (draft) => {
        const combine_list = [...draft.play_list, action.payload.track];
        const uniq_list = _.uniqBy(combine_list, "musicSrc");

        if (uniq_list.length > 20) {
          uniq_list.shift();
        }

        setSessionPlaylist(uniq_list);
        draft.play_list = uniq_list;
      }),

    [DELETE_TRACK]: (state, action) =>
      produce(state, (draft) => {
        const filtered_list = draft.play_list.filter((track) => {
          return track.musicSrc !== action.payload.track_src;
        });

        setSessionPlaylist(filtered_list);
        draft.play_list = filtered_list;
      }),

    [NOW_TRACK]: (state, action) =>
      produce(state, (draft) => {
        draft.now_track = action.payload.track;
      }),

    [SET_PLAY_LIST]: (state, action) =>
      produce(state, (draft) => {
        setSessionPlaylist(action.payload.play_list);
        draft.play_list = action.payload.play_list;
      }),

    [CLEAR_PLAY_LIST]: (state, action) =>
      produce(state, (draft) => {
        clearSessionPlaylist();
        draft.play_list = [];
        draft.now_track = {};
      }),

    [SET_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.mode = action.payload.mode;
      }),
  },
  initialState
);

const actionCreators = {
  setPlayer,
  setMode,
  addTrack,
  deleteTrack,
  nowTrack,
  loadPlayList,
  clearPlayList,
  play,
  stop,
};

export { actionCreators };

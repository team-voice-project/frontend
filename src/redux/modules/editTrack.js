import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SAVE_BASE = "SAVE_BASE";
const SAVE_AUDIO = "SAVE_AUDIO";
const UPLOAD_TRACK = "UPLOAD_TRACK";

const initialState = {
  category: "",
  tags: [],
  subject: "",
  audio_file: null,
  audio_url: "",
  audio_runtime: "00:00:00",
  cover_url: null,
};

const saveBase = createAction(SAVE_BASE, (base_info) => ({ base_info }));
const saveAudio = createAction(SAVE_AUDIO, (audio_info) => ({ audio_info }));
const uploadTrack = createAction(UPLOAD_TRACK, (track) => ({ track }));

// middlewares
const sendUploadTrackData = (track) => {
  return async (dispatch, getState, { history }) => {
    console.log("[sendUploadTrackData]", track);
    // api 연결 할것 -> /api/track [POST]
    // 업로드 후 response 데이터로 트랙정보 업데이트 할것 아래 dispatch 시에

    const trackData = new FormData();
    trackData.append("trackThumbnailUrl", track.cover_url);
    trackData.append("trackFile", track.audio_file);
    trackData.append("title", track.subject);
    trackData.append("category", track.category);
    track.tags.forEach((tag, idx) => {
      trackData.append(`tag${idx + 1}`, track.tags[idx]);
    });

    const res = await apis.uploadTrack(trackData);
    console.log("DB로 트랙정보를 업로드 한 결과: ", res);
    // dispatch(uploadTrack(track));
    // history.push("/share/123");
  };
};

// reducer
export default handleActions(
  {
    [SAVE_BASE]: (state, action) =>
      produce(state, (draft) => {
        console.log("[SET_BASE]", action.payload.base_info);
        const { category, tags, subject } = action.payload.base_info;
        draft.category = category;
        draft.tags = tags;
        draft.subject = subject;
      }),

    [SAVE_AUDIO]: (state, action) =>
      produce(state, (draft) => {
        console.log("[SAVE_AUDIO]", action.payload.audio_info);
        draft.audio_file = action.payload.audio_info.file;
        draft.audio_url = action.payload.audio_info.url;
      }),

    [UPLOAD_TRACK]: (state, action) =>
      produce(state, (draft) => {
        console.log("[UPLOAD_TRACK]", action.payload.track);
        draft.cover_url = action.payload.track.cover_url;
        draft.audio_url = action.payload.track.audio_url;
      }),
  },
  initialState
);

const actionCreators = {
  saveBase,
  saveAudio,
  sendUploadTrackData,
};

export { actionCreators };

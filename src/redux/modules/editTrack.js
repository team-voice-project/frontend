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
const sendTrackData = (track) => {
  return async (dispatch, getState, { history }) => {
    console.log("현재 모드: ", track.mode);
    console.log("미들웨어에서 받은 트랙", track);

    const trackData = new FormData();
    trackData.append("trackThumbnailUrlFace", track.cover_url);
    trackData.append("title", track.subject);
    trackData.append("trackFile", track.audio_file);
    trackData.append("category", track.category);
    trackData.append("tag1", track.tags[0] ? track.tags[0] : "");
    trackData.append("tag2", track.tags[1] ? track.tags[1] : "");
    trackData.append("tag3", track.tags[2] ? track.tags[2] : "");

    if (track.mode === "upload") {
      try {
        const res = await apis.uploadTrack(trackData);
        const { trackId } = res.data;
        history.push(`/share/${trackId}`);
      } catch (err) {
        // TODO: 업로드 실패 시 error 페이지 리다이렉팅 처리 할것
        console.log("[업로드 실패]", err.response);
      }
    } else if (track.mode === "update") {
      const update_date = {
        trackThumbnailUrlFace: track.cover_url,
        title: track.subject,
        category: track.category,
        tag1: track.tags[0] ? track.tags[0] : "",
        tag2: track.tags[1] ? track.tags[1] : "",
        tag3: track.tags[2] ? track.tags[2] : "",
      };

      try {
        const res = await apis.updateTrack(track.track_id, update_date);
        console.log("업데이트 후 결과: ", res);
        history.push(`/share/${track.track_id}`);
      } catch (err) {
        // TODO: 업데이트 실패 시 error 페이지 리다이렉팅 처리 할것
        console.log("[업데이트 실패]", err.response);
      }
    } else {
      alert("올바른 방법으로 다시 시도해주세요.");
      history.goBack();
    }
  };
};

// reducer
export default handleActions(
  {
    [SAVE_BASE]: (state, action) =>
      produce(state, (draft) => {
        console.log("[SET_BASE]", action.payload.base_info);
        const { category, tags, subject, audio_url, cover_url } =
          action.payload.base_info;
        draft.category = category;
        draft.tags = tags;
        draft.subject = subject;

        // 수정 모드일때
        draft.cover_url = cover_url;
        draft.audio_url = audio_url;
      }),

    [SAVE_AUDIO]: (state, action) =>
      produce(state, (draft) => {
        console.log("[SAVE_AUDIO]", action.payload.audio_info);
        draft.audio_file = action.payload.audio_info.file;
        draft.audio_url = action.payload.audio_info.url;
      }),
  },
  initialState
);

const actionCreators = {
  saveBase,
  saveAudio,
  sendTrackData,
};

export { actionCreators };

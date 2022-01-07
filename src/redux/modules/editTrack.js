import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SAVE_BASE = "SAVE_BASE";
const SAVE_AUDIO = "SAVE_AUDIO";
const RESET_TRACK = "RESET_TRACK";
const SET_LOADING = "SET_LOADING";

const initialState = {
  category: "",
  tags: [],
  subject: "",
  audio_file: null,
  audio_url: "",
  audio_runtime: "00:00:00",
  cover_url: null,
  is_loading: false,
};

const saveBase = createAction(SAVE_BASE, (base_info) => ({ base_info }));
const saveAudio = createAction(SAVE_AUDIO, (audio_info) => ({ audio_info }));
const resetTrack = createAction(RESET_TRACK, () => ({}));
const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

// middlewares
const sendTrackData = (track) => {
  return async (dispatch, getState, { history }) => {
    const trackData = new FormData();
    trackData.append("trackThumbnailId", track.thumbnail_id + 1);
    trackData.append("title", track.subject);
    trackData.append("trackFile", track.audio_file);
    trackData.append("category", track.category);
    trackData.append("tag1", track.tags[0] ? track.tags[0] : "");
    trackData.append("tag2", track.tags[1] ? track.tags[1] : "");
    trackData.append("tag3", track.tags[2] ? track.tags[2] : "");

    if (track.mode === "upload") {
      try {
        dispatch(setLoading(true));

        const res = await apis.uploadTrack(trackData);
        const { trackId } = res.data;

        dispatch(setLoading(false));

        history.push(`/share/${trackId}`);
      } catch (err) {
        dispatch(setLoading(false));
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
        history.push(`/share/${track.track_id}`);
      } catch (err) {
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
        draft.audio_file = action.payload.audio_info.file;
        draft.audio_url = action.payload.audio_info.url;
      }),

    [SET_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.loading;
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

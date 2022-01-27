import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const VIEW_MODAL = "VIEW_MODAL";
const SET_MODAL_TRACK = "SET_MODAL_TRACK";

const initialState = {
  open: false,
  track_info: "",
};

const viewModal = createAction(VIEW_MODAL, (boolean) => boolean);
const setModalTrack = createAction(SET_MODAL_TRACK, (track_info) => track_info);

// middlewares
const viewModalDB = (trackId) => {
  return (dispatch, getState, { history }) => {
    apis.getTrackInfoDB(trackId).then((res) => {
      dispatch(viewModal(true));
      dispatch(setModalTrack(res.data.track));
    });
  };
};
// reducer
export default handleActions(
  {
    [VIEW_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.open = action.payload;
      }),
    [SET_MODAL_TRACK]: (state, action) =>
      produce(state, (draft) => {
        draft.track_info = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  viewModal,
  viewModalDB,
};

export { actionCreators };

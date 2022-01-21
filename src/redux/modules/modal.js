import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const VIEW_MODAL = "VIEW_MODAL";

const initialState = {
  open: false,
};

const viewModal = createAction(VIEW_MODAL, (boolean) => boolean);

// middlewares
const viewModalDB = (trackId) => {
  return (dispatch, getState, { history }) => {
    apis.getTrackInfoDB(trackId).then((res) => {
      dispatch(viewModal(true));
    });
  };
};
// reducer
export default handleActions(
  {
    [VIEW_MODAL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.open = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  viewModal,
};

export { actionCreators };

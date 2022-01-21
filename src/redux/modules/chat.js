import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { newGetCookie } from "../../shared/Cookie";

import io from "socket.io-client";

const SET_SOCKET = "SET_SOCKET";
const DESTROY_SOCKET = "DESTROY_SOCKET";
const UPDATE_ROOM_LIST = "UPDATE_ROOM_LIST";
const SET_READ_ROOM = "SET_READ_ROOM";

const setSocket = createAction(SET_SOCKET, (instance) => ({ instance }));
const destroySocket = createAction(DESTROY_SOCKET, () => ({}));
const setChatData = createAction(UPDATE_ROOM_LIST, (new_message) => ({
  new_message,
}));
const setReadRoom = createAction(SET_READ_ROOM, (room_id) => ({ room_id }));

const initialState = {
  instance: null,
  rooms: {},
};

//middleware
const createSocketInstance = () => {
  return (dispatch, getState) => {
    const socket = getState().chat.instance;
    if (!socket || !socket?.connected) {
      const instance = io.connect(process.env.REACT_APP_TEST_API_URL, {
        cors: { origin: "*" },
        secure: true,
      });

      const userId = Number(newGetCookie("uid"));
      if (!userId) {
        return;
      }

      // 글로벌 메시지를 위한 방 입장
      instance?.emit("login", { userId });

      dispatch(setSocket(instance));
    }
  };
};

const destroySocketInstance = () => {
  return (dispatch, getState) => {
    const socket = getState().chat.instance;
    if (socket || socket?.connected) {
      socket?.disconnect();
      dispatch(destroySocket());
    }
  };
};

const updateChatData = (new_message) => {
  return (dispatch, getState) => {
    dispatch(setChatData(new_message));
  };
};

//reducer
export default handleActions(
  {
    [SET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.instance = action.payload.instance;
      }),

    [DESTROY_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.instance = null;
      }),

    [UPDATE_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        const room_id = action.payload.new_message.room_id;
        draft.rooms[room_id] = action.payload.new_message.data;
        draft.rooms[room_id].new = true;
      }),

    [SET_READ_ROOM]: (state, action) =>
      produce(state, (draft) => {
        const room_id = action.payload.room_id;
        if (!draft.rooms[room_id]?.new) {
          return;
        }
        draft.rooms[room_id].new = false;
      }),
  },
  initialState
);

const actionCreators = {
  createSocketInstance,
  destroySocketInstance,
  updateChatData,
  setReadRoom,
};

export { actionCreators };

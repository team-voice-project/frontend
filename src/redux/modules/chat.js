import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import io from "socket.io-client";

// const joinRoom = () => {
//   console.log("룸 입장", socket);
//   socket.emit("joinRoom", { userId: 1, qUserId: 2 });
// };
//
// const leaveRoom = () => {
//   console.log("룸 나가기");
//   socket.emit("leaveRoom", { userId: 1, qUserId: 2 });
// };
//
// const recieveMessage = () => {
//   socket.on("chat", (data) => {
//     console.log("받은 메세지", data);
//   });
// };
//
// const handleSendMessage = () => {
//   console.log("채팅 보내기");
//   socket.emit("room", {
//     userId: 1,
//     sendUserId: 2,
//     chatText: "보내는 메세지 .",
//   });
// };
//
// useEffect(() => {
//   console.log("처음 소켓 상태:", socket);
//   console.log("채팅방 입장");
//
//   joinRoom();
//   recieveMessage();
//
//   return () => {
//     socket.close();
//   };
// }, []);

const SET_SOCKET = "SET_SOCKET";
const DESTROY_SOCKET = "DESTROY_SOCKET";

const setSocket = createAction(SET_SOCKET, (instance) => ({ instance }));
const destroySocket = createAction(DESTROY_SOCKET, () => ({}));

const initialState = {
  instance: null,
};

//middleware
const createSocketInstance = () => {
  return (dispatch, getState) => {
    const socket = getState().chat.instance;
    if (!socket || !socket?.connected) {
      const instance = io.connect(process.env.REACT_APP_API_URL, {
        cors: { origin: "*" },
      });

      // TODO: 유저 채팅 정보 확인 후 모든 방에 입장 시키기
      instance?.emit("joinRoom", { userId: 1, qUserId: 2 });

      dispatch(setSocket(instance));
    }
  };
};

const destroySocketInstance = () => {
  return (dispatch, getState) => {
    const socket = getState().chat.instance;
    if (socket || socket?.connected) {
      socket?.close();
      dispatch(destroySocket());
    }
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
  },
  initialState
);

const actionCreators = {
  createSocketInstance,
  destroySocketInstance,
};

export { actionCreators };

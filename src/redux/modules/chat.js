import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { newGetCookie } from "../../shared/Cookie";

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
// const receiveMessage = () => {
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
//   receiveMessage();
//
//   return () => {
//     socket.close();
//   };
// }, []);

const SET_SOCKET = "SET_SOCKET";
const DESTROY_SOCKET = "DESTROY_SOCKET";
const UPDATE_ROOM_LIST = "UPDATE_ROOM_LIST";

const setSocket = createAction(SET_SOCKET, (instance) => ({ instance }));
const destroySocket = createAction(DESTROY_SOCKET, () => ({}));
const setChatData = createAction(UPDATE_ROOM_LIST, (new_message) => ({
  new_message,
}));

const initialState = {
  instance: null,
  rooms: {
    12: {
      new: false,
      sender: {
        id: 2,
        nick: "테스터",
      },
      msg: "안녕하세요??",
    },
  },
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

      // TODO: 유저 채팅 정보 확인 후 모든 방에 입장 시키기
      const userId = Number(newGetCookie("uid"));
      if (!userId) {
        return;
      }
      // console.log("초기 룸 입장: ", { userId: 1, qUserId: 2 });
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
  },
  initialState
);

const actionCreators = {
  createSocketInstance,
  destroySocketInstance,
  updateChatData,
};

export { actionCreators };

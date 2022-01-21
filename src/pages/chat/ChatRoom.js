import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { newGetCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";

import RoomBody from "../../components/chat/RoomBody";
import RoomFooter from "../../components/chat/RoomFooter";
import RoomHeader from "../../components/chat/RoomHeader";

const ChatRoom = () => {
  const room = useParams();
  const chat = useSelector((state) => state.chat.instance);
  const [my_info, setMyInfo] = useState(null);
  const [another_info, setAnotherInfo] = useState(null);
  const [chat_content, setChatContent] = useState([]);
  const [show_option_modal, setOptionModal] = useState(false);
  const [show_record_modal, setRecordModal] = useState(false);
  const [show_request_modal, setRequestModal] = useState(false);
  const [request_text, setRequestText] = useState("");

  useEffect(() => {
    getUserData();
    getAnotherUserData();

    return () => {
      handleLeaveRoom();
    };
  }, []);

  useEffect(() => {
    getRoomData();
  }, [chat, room]);

  useEffect(() => {
    const room_id = room?.roomId;
    if (!room_id) {
      alert("방 입장 불가");
      return;
    }

    const splitted = room_id.split("_");
    const uid = Number(newGetCookie("uid"));
    const another = Number(splitted.filter((id) => id != uid)[0]);
    const room_info = { userId: uid, qUserId: another };
    getChat(room_info, 1, 20);
  }, []);

  const getChat = async (room_info, page = 1, chat = 20) => {
    const res = await apis.getChatList(room_info, page, chat);
    if (res) {
      setChatContent((prevState) => [...prevState, ...res.data.getChat]);
    }
  };

  const getAnotherUserData = async () => {
    const { uid, another } = createRoomId();
    const { data } = await apis.getUserInfo(another);
    setAnotherInfo(data.result);
  };

  const getUserData = async () => {
    const { data } = await apis.getProfile();
    setMyInfo(data.user);
  };

  const createRoomId = () => {
    const room_id = room?.roomId;
    if (!room_id) {
      alert("방 입장 불가");
      return;
    }

    const splitted = room_id.split("_");
    const uid = Number(newGetCookie("uid"));
    const another = Number(splitted.filter((id) => id != uid)[0]);

    return {
      uid,
      another,
    };
  };

  const receiveMessage = (message) => {
    setChatContent((prevState) => [...prevState, message]);
  };

  const getRoomData = () => {
    const room_id = room?.roomId;
    if (!room_id) {
      alert("방 입장 불가");
      return;
    }

    const splitted = room_id.split("_");
    const uid = Number(newGetCookie("uid"));
    const another = Number(splitted.filter((id) => id != uid)[0]);
    // console.log("나의 uid", uid);
    // console.log("상대의 uid", another);

    chat?.emit("joinRoom", {
      userId: uid,
      qUserId: another,
    });

    chat?.on("chat", (data) => {
      console.log("채팅방에서 받은 메세지", data);
      receiveMessage(data);
    });
  };

  const sendMessage = (message, type = "normal") => {
    const { uid, another } = createRoomId();
    // console.log("채팅 보내기 receiveUserId:", another);
    // console.log("채팅 보내기 sendUserId:", uid);

    if (type === "normal") {
      chat?.emit("room", {
        receiveUserId: another,
        sendUserId: uid, // 보내는 사람 (나)
        chatText: message,
        sample: null,
      });
    }

    if (type === "request") {
      chat?.emit("room", {
        receiveUserId: another,
        sendUserId: uid, // 보내는 사람 (나)
        chatText: "샘플요청",
        sample: message,
      });
    }

    if (type === "image") {
      console.log("이미지 전송");
      chat?.emit("file", {
        receiveUserId: another,
        sendUserId: uid, // 보내는 사람 (나)
        chatType: "image",
      });
    }
  };

  const handleLeaveRoom = () => {
    console.log("방 나가기");
    const { uid, another } = createRoomId();
    chat?.emit("leaveRoom", { userId: uid, qUserId: another });
  };

  return (
    <>
      <RoomHeader
        another_info={another_info}
        handleLeaveRoom={handleLeaveRoom}
      />

      <RoomBody
        my_info={my_info}
        chat_content={chat_content}
        show_option_modal={show_option_modal}
        setRecordModal={setRecordModal}
        setRequestText={setRequestText}
        createRoomId={createRoomId}
      />
      <RoomFooter
        chat={chat}
        sendMessage={sendMessage}
        show_option_modal={show_option_modal}
        setOptionModal={setOptionModal}
        show_record_modal={show_record_modal}
        setRecordModal={setRecordModal}
        show_request_modal={show_request_modal}
        setRequestModal={setRequestModal}
        request_text={request_text}
        setRequestText={setRequestText}
        createRoomId={createRoomId}
      />
    </>
  );
};

export default ChatRoom;

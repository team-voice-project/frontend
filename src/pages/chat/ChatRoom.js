import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { newGetCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";

import RoomBody from "../../components/chat/RoomBody";
import RoomFooter from "../../components/chat/RoomFooter";
import RoomHeader from "../../components/chat/RoomHeader";

const ChatRoom = (props) => {
  const chat = useSelector((state) => state.chat.instance);
  const room = useParams();
  const [my_info, setMyInfo] = useState(null);
  const [chat_content, setChatContent] = useState([]);
  const [show_option_modal, setOptionModal] = useState(false);

  useEffect(() => {
    getUserData();

    return () => {};
  }, []);

  useEffect(() => {
    getRoomData();
  }, [chat, room]);

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
    console.log("나의 uid", uid);
    console.log("상대의 uid", another);

    console.log("새로운 룸 입장: ", {
      userId: Number(splitted[0]),
      qUserId: Number(splitted[1]),
    });

    chat?.emit("joinRoom", {
      userId: uid,
      qUserId: another,
    });

    chat?.on("chat", (data) => {
      console.log("채팅방에서 받은 메세지", data);
      receiveMessage(data);
    });
  };

  const sendMessage = (message) => {
    const { uid, another } = createRoomId();
    console.log("채팅 보내기 receiveUserId:", another);
    console.log("채팅 보내기 sendUserId:", uid);

    // socket send
    chat?.emit("room", {
      receiveUserId: another,
      sendUserId: uid, // 보내는 사람 (나)
      chatText: message,
    });
  };

  const handleLeaveRoom = () => {
    console.log("방 나가기");
    const { uid, another } = createRoomId();
    chat?.emit("leaveRoom", { userId: uid, qUserId: another });
  };

  return (
    <>
      <RoomHeader />
      <RoomBody
        my_info={my_info}
        chat_content={chat_content}
        show_option_modal={show_option_modal}
      />
      <RoomFooter
        sendMessage={sendMessage}
        show_option_modal={show_option_modal}
        setOptionModal={setOptionModal}
      />
    </>
  );
};

export default ChatRoom;

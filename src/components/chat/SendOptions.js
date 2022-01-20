import React from "react";
import styled from "styled-components";
import { convertAudio } from "../../shared/utils";
import { apis } from "../../shared/api";

import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiFillFolder } from "react-icons/ai";
import { ImImage } from "react-icons/im";

const SendOptions = ({
  sendMessage,
  setRecordModal,
  setRequestModal,
  createRoomId,
}) => {
  const handleOpenRecordModal = () => {
    setRecordModal(true);
  };

  const handleOpenRequestModal = () => {
    setRequestModal(true);
  };

  const sendImageFile = async (image) => {
    try {
      const { uid, another } = createRoomId();

      const send_data = new FormData();
      send_data.append("image", image);
      send_data.append("sendUserId", uid);
      send_data.append("receiveUserId", another);

      const res = await apis.sendImageChat(send_data);
      console.log("이미지 전송결과: ", res);
      return true;
    } catch (err) {
      console.log("[sendImageFile] 이미지 전송에 실패했습니다.");
      return false;
    }
  };

  const handleChangeUploadImage = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    const ACCEPT_LIST = ["jpg", "png", "jpeg", "gif"];
    const image_type = e.target.files[0].type;

    const is_accept = ACCEPT_LIST.some(
      (accept_type) => image_type.indexOf(accept_type) > -1
    );
    if (!is_accept) {
      alert("jpg, png, jpeg, gif 확장자만 첨부 할 수 있어요 :(");
      return;
    }

    console.log("첨부 이미지:", e.target.files[0]);

    const result = await sendImageFile(e.target.files[0]);
    if (result) {
      sendMessage(null, "image");
      e.target.value = null;
    } else {
      console.log("이미지 전송이 실패했습니다.");
      e.target.value = null;
    }
  };

  const handleChangeUploadVoice = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const converted = await convertAudio(e.target.files[0], "mp3");
    console.log(converted, converted.name);
  };

  return (
    <List>
      <IconDiv onClick={handleOpenRecordModal}>
        <OptionsDiv>
          <BsFillMicFill />
        </OptionsDiv>
        <OptionsName>녹음</OptionsName>
      </IconDiv>
      <IconDiv onClick={handleOpenRequestModal}>
        <OptionsDiv>
          <AiFillFileText />
        </OptionsDiv>
        <OptionsName>샘플 요청</OptionsName>
      </IconDiv>
      <IconDiv htmlFor={"imageUploader"}>
        <input
          type="file"
          accept={"image/png, image/jpeg, image/gif"}
          id={"imageUploader"}
          onChange={handleChangeUploadImage}
        />
        <OptionsDiv>
          <ImImage />
        </OptionsDiv>
        <OptionsName>이미지 첨부</OptionsName>
      </IconDiv>
      <IconDiv htmlFor={"voiceUploader"}>
        <input
          type="file"
          accept={"audio/*"}
          id={"voiceUploader"}
          onChange={handleChangeUploadVoice}
        />
        <OptionsDiv>
          <AiFillFolder />
        </OptionsDiv>
        <OptionsName>녹음본 첨부</OptionsName>
      </IconDiv>
    </List>
  );
};

export default SendOptions;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #2c2b2b;
  height: 120px;
  padding: 0 30px;
  max-width: 425px;
  align-items: center;
  margin: 0px auto;
`;

const OptionsName = styled.p`
  color: #c7c7c7;
  font-size: 10px;
`;

const OptionsDiv = styled.div`
  display: flex;
  background: black;
  width: 56px;
  height: 56px;
  font-size: 24px;
  padding: 10px;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const IconDiv = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="file"] {
    display: none;
  }
`;

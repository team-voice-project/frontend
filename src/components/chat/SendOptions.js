import React, { useState } from "react";
import styled from "styled-components";
import { byteToMegaByte, iOS } from "../../shared/utils";
import { apis } from "../../shared/api";

import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiFillFolder } from "react-icons/ai";
import { ImImage } from "react-icons/im";
import ScaleLoader from "react-spinners/ScaleLoader";

const SendOptions = ({
  chat,
  sendMessage,
  setRecordModal,
  setRequestModal,
  createRoomId,
  show_option_modal,
  request_text,
  setRequestText,
}) => {
  const [show_loading_modal, setLoadingModal] = useState(false);

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
      // console.log("이미지 전송결과: ", res);
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

    const result = await sendImageFile(e.target.files[0]);
    if (result) {
      sendMessage(null, "image");
      e.target.value = null;
    } else {
      console.log("이미지 전송이 실패했습니다.");
      e.target.value = null;
    }
  };

  const sendVoiceData = async (voice_file) => {
    const { uid, another } = createRoomId();

    const send_data = new FormData();
    send_data.append("trackFile", voice_file);
    send_data.append("sendUserId", uid);
    send_data.append("receiveUserId", another);

    // 컨버팅 여부를 위해 사용자 디바이스가 iOS인지 아닌지 결과값 전달
    const is_iphone = iOS();
    if (is_iphone) {
      send_data.append("device", "iphone");
    }

    if (request_text) {
      send_data.append("sample", request_text);
    }

    try {
      const res = await apis.sendVoiceChat(send_data);
      // console.log("목소리 파일 전송 결과: ", res);
      setRequestText("");
      return true;
    } catch (err) {
      alert(err.response);
      // console.log(err.response);
      setRequestText("");
      return false;
    }
  };

  const handleChangeUploadVoice = async (e) => {
    if (!e.target.files[0]) {
      return;
    }

    const checkFileSize = (files) => {
      const file_size = files.size;
      const limit = 20 * 1024 * 1024;
      return file_size > limit;
    };

    const is_oversize = checkFileSize(e.target.files[0]);
    if (is_oversize) {
      alert(
        "20MB 이하 파일만 등록할 수 있습니다.\n\n" +
          "현재파일 용량 : " +
          byteToMegaByte(e.target.files[0].size) +
          "MB"
      );
      return;
    }

    setLoadingModal(true);

    const result = await sendVoiceData(e.target.files[0]);
    if (result) {
      const { uid, another } = createRoomId();

      chat?.emit("file", {
        receiveUserId: another,
        sendUserId: uid, // 보내는 사람 (나)
        chatType: "track",
      });

      setTimeout(() => {
        setLoadingModal(false);
        setRecordModal(false);
        e.target.value = null;
      }, 500);
    } else {
      alert("목소리 전송이 실패했습니다.");
      setTimeout(() => {
        setLoadingModal(false);
        e.target.value = null;
      }, 500);
    }
  };

  return (
    <>
      <List className={!show_option_modal ? "" : "hide"}>
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

      {show_loading_modal && (
        <LoadingSpinModal>
          <div className={"spinner-box"}>
            <p className={"guide-text"}>
              <b>전송 중입니다.</b>
              <br />
              <br />
              잠시만 기다려주세요.
            </p>

            <ScaleLoader color={"var(--point-color)"} height={18} />
          </div>
        </LoadingSpinModal>
      )}
    </>
  );
};

export default SendOptions;

const LoadingSpinModal = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  text-align: center;

  .spinner-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 180px;
    color: #000;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

    .guide-text {
      color: #666;
      font-size: 13px;
      margin-bottom: 20px;

      b {
        color: #333;
        font-size: 15px;
      }
    }
  }
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #2c2b2b;
  height: 120px;
  max-width: 425px;
  margin: 0 auto;
  border-top: 1px solid #5b5b5b;
  border-bottom: 1px solid #5b5b5b;

  &.hide {
    display: none;
  }
`;

const OptionsName = styled.p`
  color: #c7c7c7;
  font-size: 10px;
`;

const OptionsDiv = styled.div`
  display: flex;
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
  justify-content: center;
  border-right: 1px solid #5b5b5b;
  width: 100%;
  height: 100%;

  &:last-child {
    border-right: 0;
  }

  input[type="file"] {
    display: none;
  }
`;

import React from "react";
import styled from "styled-components";
import { byteToMegaByte, convertAudio } from "../../shared/utils";

import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiFillFolder } from "react-icons/ai";
import { ImImage } from "react-icons/im";

const SendOptions = ({ setRecordModal, setRequestModal }) => {
  const handleOpenRecordModal = () => {
    setRecordModal(true);
  };

  const handleOpenRequestModal = () => {
    setRequestModal(true);
  };

  const handleChangeUploadImage = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    console.log(e.target.files[0], e.target.value);
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
          accept={"image/*"}
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

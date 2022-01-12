import React from "react";
import styled from "styled-components";
import { BsFillMicFill } from "react-icons/bs";
import { AiFillFileText, AiFillFolder } from "react-icons/ai";
import { ImImage } from "react-icons/im";

const SendOptions = () => {
  return (
    <List>
      <IconDiv>
        <OptionsDiv>
          <BsFillMicFill />
        </OptionsDiv>
        <OptionsName>녹음</OptionsName>
      </IconDiv>
      <IconDiv>
        <OptionsDiv>
          <AiFillFileText />
        </OptionsDiv>
        <OptionsName>샘플 요청</OptionsName>
      </IconDiv>
      <IconDiv>
        <OptionsDiv>
          <ImImage />
        </OptionsDiv>
        <OptionsName>이미지 첨부</OptionsName>
      </IconDiv>
      <IconDiv>
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

const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

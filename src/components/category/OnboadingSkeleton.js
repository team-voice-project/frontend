import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Container from "../../elements/Container";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

import { HiHeart } from "react-icons/hi";
import { RiChat4Fill } from "react-icons/ri";
import { Button } from "../../elements";

const OnBoarding = ({ onClose }) => {
  return (
    <Background>
      <Header noHeader />
      <Container>
        <BoxDiv>
          <Flex>
            <SmallCircle></SmallCircle>
            <NameDiv></NameDiv>
          </Flex>
          <ImgDiv></ImgDiv>

          <FlexTag>
            <div style={{ display: "inline-block" }}>
              <TagBox></TagBox>
            </div>
          </FlexTag>

          <BoldFont></BoldFont>

          <SingleAudioPlayer></SingleAudioPlayer>

          <FlexCount>
            <CountBox>
              <HiHeart size="20"></HiHeart>
              <CountText></CountText>
            </CountBox>
            <CountBox>
              <RiChat4Fill size="18"></RiChat4Fill>
              <CountText></CountText>
            </CountBox>
          </FlexCount>
        </BoxDiv>
        <Button bg margin="0px 0px 15px 0px"></Button>
        <Button border margin="0px 0px 25px 0px" _onClick={onClose}></Button>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  z-index: 9999;
  overflow-y: auto;
`;

const BoxDiv = styled.div`
  width: 100%;
  height: 490px;
  background-color: #252525;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  margin-right: 16px;
`;

const FlexTag = styled.div`
  width: 100%;
  margin: 4px auto 0px auto;
  text-align: center;
`;

const FlexCount = styled.div`
  display: flex;
  align-items: center;
  vertical-align: right;
  margin: 4px 0px 0px 250px;

  @media screen and (max-width: 380px) {
    margin: 10px 0px 0px 200px;
  }
  @media screen and (max-width: 320px) {
    margin: 10px 0px 0px 150px;
  }
`;

const SmallCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: none;
  overflow: hidden;
  position: relative;
  background-color: #2c2b2b;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #2c2b2b, #ddd, #2c2b2b);
    animation: loading 2s infinite linear;
  }
`;

const NameDiv = styled.div`
  width: 80px;
  height: 20px;
  background-color: #ddd;
  margin: 8px;
  overflow: hidden;
  position: relative;
  background-color: #2c2b2b;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #2c2b2b, #ddd, #2c2b2b);
    animation: loading 2s infinite linear;
  }
`;

const ImgDiv = styled.div`
  width: 160px;
  height: 160px;
  margin: 48px auto 25px auto;
  overflow: hidden;
  position: relative;
  border: none;
  background-color: #2c2b2b;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #2c2b2b, #ddd, #2c2b2b);
    animation: loading 2s infinite linear;
  }
`;

const CountText = styled.div`
  font-size: 12px;
  color: #c4c4c4;
  margin-left: 2px;
`;

const BoldFont = styled.div`
  font-size: 18px;
  color: #c4c4c4;
  font-weight: 550;
  text-align: center;
  font-family: "Pretendard Variable", serif;
  margin-bottom: 16px;
`;

const TagBox = styled.button`
  margin: 10px 5px;
  font-family: "Pretendard Variable", serif;
  height: 28px;
  width: 70px;
  font-size: 12px;
  color: white;
  padding: 5px 10px;
  border-radius: 14px;
  border: none;
  background-color: #000;
  cursor: Default;
  overflow: hidden;
  position: relative;
  background-color: #2c2b2b;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #2c2b2b, #ddd, #2c2b2b);
    animation: loading 2s infinite linear;
  }
`;

export default OnBoarding;

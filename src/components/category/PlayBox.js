import React from "react";
import styled from "styled-components";
import { BiPause } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";

import MenuModal from "../mypage/MenuModal";

const PlayBox = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [playBtn, setPlayBtn] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Flex>
        <MenuModal open={modalOpen} close={closeModal} header={"123"} />
        <MarginDiv>
          {playBtn ? (
            <Circle
              style={{
                border: "5px solid #f1134e ",
                transition: "all 300ms ease-in",
              }}
            >
              <PlayButton
                onClick={() => {
                  setPlayBtn(false);
                }}
              >
                <BiPause
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </PlayButton>
            </Circle>
          ) : (
            <Circle>
              <PlayButton
                onClick={() => {
                  setPlayBtn(true);
                }}
              >
                <FaPlay
                  style={{
                    color: "white",
                    marginLeft: "4px",
                    marginTop: "2px",
                  }}
                />
              </PlayButton>
            </Circle>
          )}

          <Title>깔끔한 목소리 나레이션</Title>
          <Name>김명자</Name>
          <Count>
            <Flex>
              <IconDiv></IconDiv>
              <LikeComment>132</LikeComment>
            </Flex>
            <Flex>
              <IconDiv></IconDiv>
              <LikeComment>20</LikeComment>
            </Flex>
          </Count>
        </MarginDiv>
      </Flex>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MarginDiv = styled.div`
  margin: 0px 16px 20px 0px;
  @media screen and (max-width: 360px) {
    margin: 0px 10px 20px 0px;
  }
`;

const Circle = styled.div`
  width: 130px;
  height: 130px;
  background-color: #ddd;
  /* border: 5px solid #ff00b3; */
  border-radius: 120px;
  margin: 0px 0px 12px 0px;
  background-image: url("/assets/kimkong.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    width: 110px;
    height: 110px;
    border-radius: 100px;
    margin: 0px 0px 12px 0px;
  }
`;

const PlayButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: #f1134e;
  border: none;
  position: relative;
  left: 92px;
  top: 90px;
  /* background-image: url("/assets/playButton.png");
  background-repeat: no-repeat;
  background-size: cover; */
  @media screen and (max-width: 360px) {
    width: 26px;
    height: 26px;
    border-radius: 28px;
    margin: 0px 0px 16px 0px;
    position: relative;
    left: 78px;
    top: 74px;
  }
`;

const Title = styled.text`
  font-size: 13px;
  margin: 0px 0px 2px 0px;
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;

  @media screen and (max-width: 360px) {
    font-size: 12px;
    margin: 0px 0px 2px 0px;
    overflow: hidden;
  }
`;

const Name = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  @media screen and (max-width: 360px) {
    font-size: 11px;
  }
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 60px;
  @media screen and (max-width: 360px) {
    padding-right: 30px;
  }
`;

const IconDiv = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: #ddd;
`;

const LikeComment = styled.div`
  font-size: 12px;
  margin-right: 4px;
  @media screen and (max-width: 360px) {
    font-size: 11px;
  }
`;

export default PlayBox;

import React from "react";
import styled from "styled-components";

const PlayBox = () => {
  return (
    <div>
      <Flex>
        <MarginDiv>
          <Circle>
            <PlayButton />
          </Circle>

          <Title>깔끔한 목소리</Title>
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
  margin-bottom: 24px;
  margin-top: 20px;
  padding-left: 20px;
`;

const Circle = styled.div`
  width: 120px;
  height: 120px;
  background-color: #ddd;
  border: 5px solid #e6cf00;
  border-radius: 120px;
  margin: 0px 12px 16px 0px;
`;

const PlayButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #727272;
  border: none;
  position: relative;
  left: 85px;
  top: 80px;
`;

const Title = styled.div`
  font-size: 14px;
  margin: 2px 0px;
`;

const Name = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 60px;
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
`;

export default PlayBox;

import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Container from "../elements/Container";

const OnBoarding = ({ setShowModal }) => {
  return (
    <Background>
      <Header />
      <Container>
        <BoxDiv>
          <Flex>
            <SmallCircle></SmallCircle>
            <Name>조은영</Name>
          </Flex>
          <div>
            <OAOImage></OAOImage>
            <div>
              <FlexCount>
                <div style={{ margin: "auto", display: "flex" }}>
                  <CountBox>
                    <IconDiv></IconDiv>
                    <CountText>132</CountText>
                  </CountBox>
                  <CountBox>
                    <IconDiv></IconDiv>
                    <CountText>28</CountText>
                  </CountBox>
                </div>
              </FlexCount>
            </div>
          </div>
          <BoldFont>새벽에 어울리는 나레이션</BoldFont>

          <FlexTag>
            <TagBox>깔끔한</TagBox>
            <TagBox>깔끔한</TagBox>
            <TagBox>깔끔한</TagBox>
          </FlexTag>

          <PlayBar></PlayBar>
        </BoxDiv>
        <Btn>나도 목소리 올리기</Btn>
        <Btn
          onClick={() => {
            setShowModal(false);
          }}
        >
          다른 목소리 듣기
        </Btn>
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
  height: 520px;
  background-color: #252525;
  border-radius: 12px;
  margin-bottom: 45px;
  padding: 23px;
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
  margin-right: 15px;
`;

const FlexTag = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`;

const FlexCount = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  margin-bottom: 20px;
`;

const SmallCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 40px;
  background-color: #616161;
`;

const Name = styled.div`
  font-size: 16px;
  margin-left: 12px;
`;

const OAOImage = styled.div`
  width: 180px;
  height: 180px;
  background-color: #ddd;
  margin: 48px auto 25px auto;
`;

const IconDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;
  margin-right: 8px;
`;

const CountText = styled.div`
  font-size: 18px;
  color: #c4c4c4;
`;

const BoldFont = styled.div`
  font-size: 20px;
  color: #c4c4c4;
  font-weight: 550;
  text-align: center;
`;

const TagBox = styled.button`
  width: 60px;
  height: 32px;
  background-color: #000000;
  color: #fff;
  border-radius: 20px;
  font-size: 13px;
  text-align: center;
  align-items: center;
  margin: 15px 10px 0px 0px;
  border: none;
  display: inline-block;
`;

const PlayBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f5db6a;
  margin-top: 30px;
`;

const Btn = styled.button`
  width: 100%;
  height: 62px;
  border: none;
  border-radius: 10px;
  background-color: #f1134e;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
`;

export default OnBoarding;

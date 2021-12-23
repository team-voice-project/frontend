import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Container from "../elements/Container";

const OnBoarding = ({ setShowModal }) => {
  return (
    <Background>
      {/* <Header /> */}
      <Container>
        <BoxDiv>
          <Flex>
            <SmallCircle></SmallCircle>
            <Name>조은영</Name>
          </Flex>
          <div>
            <BigCircle></BigCircle>
            <div>
              <FlexCount>
                <div>132</div>
                <div>132</div>
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
  background-color: rgb(255, 251, 251);
  z-index: 9999;
`;

const BoxDiv = styled.div`
  width: 100%;
  height: 540px;
  background-color: #b6b6b6;
  border-radius: 12px;
  margin-bottom: 45px;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const FlexTag = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
  padding: 0px 70px;
`;

const FlexCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 110px;
  margin-bottom: 20px;
`;

const SmallCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #616161;
`;

const Name = styled.div`
  font-size: 15px;
  margin-left: 12px;
`;

const BigCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  background-color: #ddd;
  margin: 30px auto 20px auto;
`;

const BoldFont = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  text-align: center;
`;

const TagBox = styled.button`
  width: 55px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  text-align: center;
  align-items: center;
  margin: 15px 10px 0px 0px;
  border: none;
`;

const PlayBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f5db6a;
  margin-top: 30px;
`;

const Btn = styled.button`
  width: 100%;
  height: 8vh;
  border: none;
  border-radius: 10px;
  background-color: #777777;
  color: #fff;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
`;

export default OnBoarding;

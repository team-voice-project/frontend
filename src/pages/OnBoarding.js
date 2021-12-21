import React from "react";
import styled from "styled-components";
import Container from "../elements/Container";

const OnBoarding = () => {
  return (
    <div>
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
        </BoxDiv>
        <Btn>나도 목소리 올리기</Btn>
        <Btn>다른 목소리 듣기</Btn>
      </Container>
    </div>
  );
};

const BoxDiv = styled.div`
  width: 100%;
  height: 55vh;
  background-color: #b6b6b6;
  border-radius: 12px;
  margin-bottom: 45px;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
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

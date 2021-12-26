import React from "react";
import styled from "styled-components";
import { Container } from "../elements";

const Login = () => {
  return (
    <>
      <Container>
        <SearchBar>
          <Flex>
            <Icon></Icon>
            <SearchText>로그인</SearchText>
          </Flex>
        </SearchBar>

        <LoginText>3초 로그인 후,</LoginText>
        <LoginText>다시 만나요 OAO</LoginText>

        <OAOImage></OAOImage>

        <LoginButtonG></LoginButtonG>
        <LoginButtonN></LoginButtonN>
        <LoginButtonK></LoginButtonK>
      </Container>
    </>
  );
};

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
  margin: 58px 0px 100px 0px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Icon = styled.div`
  width: 20px;
  height: 32px;
  background-color: #ddd;
  margin-right: 12px;
`;

const SearchText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const LoginText = styled.div`
  font-size: 32px;
  font-weight: 1000;
`;

const OAOImage = styled.div`
  width: 250px;
  height: 220px;
  margin: 100px auto 35px auto;
  background-color: #fff;
`;

const LoginButtonG = styled.button`
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/google.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

const LoginButtonN = styled.button`
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/naver.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

const LoginButtonK = styled.button`
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/kakao.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export default Login;

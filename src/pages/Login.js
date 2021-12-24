import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Container } from "../elements";

const Login = () => {
  return (
    <>
      <Header />
      <Container>
        <Logo></Logo>

        <SearchBar>
          <Flex>
            <Icon></Icon>
            <SearchText>검색</SearchText>
          </Flex>
          <IconDiv></IconDiv>
        </SearchBar>

        <LoginText>3초 로그인 후,</LoginText>
        <LoginText>다시 만나요 OAO</LoginText>

        <div>
          <LoginButton
          // className="g-signin2"
          // data-onsuccess="onSignIn"
          // data-theme="dark"
          ></LoginButton>

          <LoginButton></LoginButton>
          <LoginButton></LoginButton>
        </div>
      </Container>
    </>
  );
};

const Logo = styled.div`
  width: 80px;
  height: 30px;
  background-color: #ddd;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
  margin: 20px 0px 50px 0px;
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

const IconDiv = styled.div`
  width: 25px;
  height: 25px;
  background-color: #ddd;
`;

const LoginText = styled.div`
  font-size: 30px;
  font-weight: 1000;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 7.5vh;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 10px;
  position: relative;
  top: 40vh;
  background-image: url("/assets/NButton.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Login;

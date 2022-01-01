import React from "react";
import styled from "styled-components";
import { Container } from "../../elements";

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;
const NAVER_KEY = process.env.REACT_APP_NAVER_KEY;
const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

const Login = ({ history, location }) => {
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

        <LoginButtonG href="https://accounts.google.com/o/oauth2/v2/auth?scope=profile&amp;response_type=code&amp;client_id=283372056185-4d683ifd0ec8u3un2lmtmrq94qh0cgc8.apps.googleusercontent.com&amp;redirect_uri=http://localhost:3000/api/auth/google/callback"></LoginButtonG>

        <LoginButtonN
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${NAVER_KEY}&amp;redirect_uri=http://localhost:3000/api/auth/naver/callback&amp;state=state`}
        ></LoginButtonN>
        <LoginButtonK href="https://kauth.kakao.com/oauth/authorize?client_id=f1e0d9ea23cc43e8717f86da6573a3a1&amp;redirect_uri=http://localhost:3000/api/auth/kakao/callback&amp;response_type=code"></LoginButtonK>
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

const LoginButtonG = styled.a`
  display: block;
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/images/google.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

const LoginButtonN = styled.a`
  display: block;
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/images/naver.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

const LoginButtonK = styled.a`
  display: block;
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/images/kakao.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export default Login;

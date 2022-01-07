import React from "react";
import styled from "styled-components";
import { Container, Font } from "../../elements/index";
import { RiArrowLeftSLine } from "react-icons/ri";

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;
const NAVER_KEY = process.env.REACT_APP_NAVER_KEY;
const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

const Login = ({ history, location }) => {
  return (
    <>
      <Container>
        <SearchBar>
          <Flex>
            <RiArrowLeftSLine
              cursor="pointer"
              size="28"
              onClick={() => {
                history.push("/");
              }}
            ></RiArrowLeftSLine>
            <Font title fontSize="22px" margin="5px 0px 0px 0px">
              로그인
            </Font>
          </Flex>
        </SearchBar>

        <Font title fontSize="28px">
          3초 로그인 후,
        </Font>
        <Font title fontSize="28px">
          다시 만나요 OAO
        </Font>

        <OAOImage></OAOImage>

        <LoginButtonG href="https://accounts.google.com/o/oauth2/v2/auth?scope=profile&amp;response_type=code&amp;client_id=283372056185-4d683ifd0ec8u3un2lmtmrq94qh0cgc8.apps.googleusercontent.com&amp;redirect_uri=http://localhost:3000/api/auth/google/callback">
          구글로 로그인
        </LoginButtonG>

        <LoginButtonN
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${NAVER_KEY}&amp;redirect_uri=http://localhost:3000/api/auth/naver/callback&amp;state=state`}
        >
          네이버로 로그인
        </LoginButtonN>
        <LoginButtonK href="https://kauth.kakao.com/oauth/authorize?client_id=f1e0d9ea23cc43e8717f86da6573a3a1&amp;redirect_uri=http://localhost:3000/api/auth/kakao/callback&amp;response_type=code">
          카카오로 로그인
        </LoginButtonK>
      </Container>
    </>
  );
};

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
  margin: 20px 0px 60px 0px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  width: 150px;
  height: 25px;
`;

const Icon = styled.div`
  width: 20px;
  height: 28px;
  background-color: #ddd;
  margin-right: 12px;
`;

const SearchText = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const LoginText = styled.div`
  font-size: 26px;
  font-weight: 1000;
`;

const OAOImage = styled.div`
  width: 180px;
  height: 200px;
  margin: 85px auto 35px auto;

  background-image: url("/assets/images/OAOoriginal.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const LoginButtonG = styled.a`
  display: block;
  width: 100%;
  height: 55px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;
  color: #8f8e8e;
  font-family: "GmarketSansBold", serif;
  font-size: 18px;
  line-height: 55px;
  text-align: center;

  background-image: url("/assets/images/google.svg");
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
  height: 55px;
  margin-bottom: 12px;
  background-color: #ddd;
  color: #fff;
  font-family: "GmarketSansBold", serif;
  line-height: 55px;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 12px;

  background-image: url("/assets/images/naver.svg");
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
  height: 55px;
  margin-bottom: 12px;
  background-color: #ddd;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-family: "GmarketSansBold", serif;
  font-size: 18px;
  line-height: 55px;
  text-align: center;

  background-image: url("/assets/images/kakao.png");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 360px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export default Login;

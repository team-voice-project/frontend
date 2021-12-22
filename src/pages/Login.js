import React from "react";
import styled from "styled-components";
import { Container } from "../elements";

const Login = () => {
  return (
    <Container>
      <div></div>

      <LoginText>3초 로그인 후,</LoginText>
      <LoginText>다시 만나요 :)</LoginText>
    </Container>
  );
};

const LoginText = styled.div`
  font-size: 24px;
  margin: 2px 0px 0px 47px;
`;

export default Login;

import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Container, Font, Button } from "../elements";

const ErrorHandlePage = ({ history }) => {
  const params = useParams();
  const ERROR_CODE = params.code || 404;

  return (
    <Container>
      <ErrorPageWrap code={ERROR_CODE}>
        <div className={"error-title"}>
          <Font title>
            <b className={"error-code"}>{ERROR_CODE}</b> error
          </Font>
          <Font title>페이지를 찾을 수 없습니다!</Font>
        </div>

        <div className={"error-sub-title"}>
          <Font title>
            죄송합니다, 페이지를 찾을 수 없습니다.
            <br />
            홈으로 돌아가서 다시 시도해주세요!
          </Font>
        </div>

        <Button _className={"home-btn"} _onClick={() => history.push("/")}>
          홈으로 가기
        </Button>
      </ErrorPageWrap>
    </Container>
  );
};

export default ErrorHandlePage;

const ErrorPageWrap = styled.section`
  width: 100%;
  height: 100vh;
  ${({ code }) => {
    if (code == "400" || code == "404" || code == "500") {
      return `background-image: url("/assets/images/${code}.png");`;
    } else {
      return `background-image: url("/assets/images/400.png");`;
    }
  }}
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% auto;
  padding-top: 10vh;

  .error-title {
    font-size: 1.8rem;
    margin-bottom: 40px;

    .error-code {
      font-size: 4rem;
    }
  }

  .error-sub-title {
    color: #7c7c7c;
    font-size: 14px;
    margin-bottom: 40px;
  }

  .home-btn {
    color: #000;
    background-color: #fff;
  }
`;

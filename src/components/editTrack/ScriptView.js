import React from "react";
import styled from "styled-components";

import { Container } from "../../elements";

const ScriptView = ({ script_text }) => {
  return (
    <ViewWrap>
      <Container>
        <div className={"view-content"}>
          <strong className={"title"}>기본 설정하기</strong>
          <div className={"script-text"}>{script_text}</div>
        </div>
      </Container>
    </ViewWrap>
  );
};

export default ScriptView;

const ViewWrap = styled.div`
  padding-top: 42px;

  .view-content {
    padding-top: 20px;

    .title {
      display: block;
      margin-bottom: 20px;
    }

    .script-text {
      font-size: 16px;
      overflow-y: auto;
      height: calc(60vh - 62px);
    }
  }
`;

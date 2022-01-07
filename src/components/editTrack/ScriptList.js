import React from "react";
import styled from "styled-components";

const ScriptList = () => {
  return (
    <ScriptWrap>
      <button type={"button"}>스크립트1</button>
      <button type={"button"}>스크립트1</button>
      <button type={"button"}>스크립트1</button>
      <button type={"button"}>스크립트1</button>
      <button type={"button"}>스크립트1</button>
      <p className={"script-guide"}>
        스크립트 예시를 선택해서
        <br />
        빠르게 작성해보세요!
      </p>
    </ScriptWrap>
  );
};

export default ScriptList;

const ScriptWrap = styled.div`
  .script-guide {
    padding: 20px 0;
    text-align: center;
  }
`;

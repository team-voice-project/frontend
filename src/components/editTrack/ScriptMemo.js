import React, { forwardRef } from "react";
import styled from "styled-components";
import { autoHeightArea } from "../../shared/utils";

const ScriptMemo = forwardRef((props, ref) => {
  return (
    <MemoWrap>
      <textarea
        placeholder={"녹음본 제목 작성"}
        onKeyUp={autoHeightArea}
        onKeyDown={autoHeightArea}
        ref={ref}
      />
    </MemoWrap>
  );
});

export default ScriptMemo;

const MemoWrap = styled.div`
  height: 100%;

  textarea {
    border: 0;
    width: 100%;
    height: calc(100% - 24px);
    max-height: calc(100% - 24px);
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0 -10px;
  }
`;

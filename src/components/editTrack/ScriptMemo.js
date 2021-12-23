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
      ></textarea>
    </MemoWrap>
  );
});

export default ScriptMemo;

const MemoWrap = styled.div`
  textarea {
    border: 0;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    margin: 0 -10px;
  }
`;

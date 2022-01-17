import React, { forwardRef } from "react";
import styled from "styled-components";
import { autoHeightArea } from "../../shared/utils";

const ScriptMemo = forwardRef((props, ref) => {
  return (
    <MemoWrap>
      <textarea
        placeholder={"녹음 시 필요한 내용을 작성해서 읽어보세요!"}
        ref={ref}
      />
    </MemoWrap>
  );
});

export default ScriptMemo;

const MemoWrap = styled.div`
  height: 100%;

  textarea {
    color: #fff;
    background-color: #2c2b2b;
    border: 0;
    width: 100%;
    height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

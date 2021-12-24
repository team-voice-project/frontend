import React, { useRef, useState } from "react";
import styled from "styled-components";

import { Container } from "../../elements";
import ScriptMemo from "../../components/editTrack/ScriptMemo";
import Recorder from "../../components/editTrack/Recorder";
import ScriptView from "../../components/editTrack/ScriptView";

const EditRecord = () => {
  const handleClickNextBtn = () => {};
  const scriptRef = useRef(null);
  return (
    <EditWrap>
      <Container padding={"0"}>
        <nav className={"edit-header"}>
          <button type={"button"}>뒤로가기</button>
          <button type={"button"} onClick={handleClickNextBtn}>
            다음
          </button>
        </nav>
      </Container>

      <Container padding={"0px"}>
        <div className={"progress-bar"}>
          <div className={"progress-bar-content"}></div>
        </div>
      </Container>

      <Container padding={"20px"}>
        <div className={"edit-body"}>
          <strong className={"title"}>목소리 올리기</strong>

          <ScriptMemo ref={scriptRef} />
        </div>
      </Container>

      <div className={"recording-widget active"}>
        <ScriptView />
        <Recorder />
      </div>
    </EditWrap>
  );
};

export default EditRecord;

const EditWrap = styled.section`
  .edit-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 8px 20px;
  }

  .progress-bar {
    height: 2px;
    background-color: #ccc;

    .progress-bar-content {
      width: 70%;
      height: inherit;
      background-color: #ffdc62;
    }
  }

  .edit-body {
    .title {
      display: block;
      margin-bottom: 20px;
    }
  }

  .recording-widget {
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 30vh;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;

    &.active {
      top: 0;
      height: 100vh;
    }
  }
`;

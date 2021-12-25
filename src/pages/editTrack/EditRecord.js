import React, { useRef, useState } from "react";
import styled from "styled-components";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";

import { Container } from "../../elements";
import ScriptMemo from "../../components/editTrack/ScriptMemo";
import Recorder from "../../components/editTrack/Recorder";
import ScriptView from "../../components/editTrack/ScriptView";
import { useDispatch } from "react-redux";

const EditRecord = ({ history }) => {
  const dispatch = useDispatch();
  const scriptRef = useRef(null);
  const [voice_file, setVoiceFile] = useState({
    file: null,
    type: null,
    url: null,
  });
  const [script_active, setScriptActive] = useState(false);
  const [script_text, setScriptText] = useState("");

  const handleClickNextBtn = () => {
    for (const prop in voice_file) {
      console.log("파일 속성", prop);
      if (voice_file[prop] === null) {
        alert("목소리가 준비되어있지 않아요 :(");
        return;
      }
    }

    console.log("저장될 녹음 파일: ", voice_file);
    dispatch(editTrackActions.saveAudio(voice_file));
    history.push("/edit/final");
  };

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
          <div className={"progress-bar-content"} />
        </div>
      </Container>

      <Container padding={"20px"} _className={"stretch-height"}>
        <div className={"edit-body"}>
          <strong className={"title"}>목소리 올리기</strong>
          <ScriptMemo ref={scriptRef} />
        </div>
      </Container>

      {/* widget usage -> add active class*/}
      <div className={`recording-widget ${script_active && "active"}`}>
        {script_active && <ScriptView script_text={script_text} />}

        <Recorder
          setVoiceFile={setVoiceFile}
          setScriptActive={setScriptActive}
          setScriptText={setScriptText}
          scriptRef={scriptRef}
        />
      </div>
    </EditWrap>
  );
};

export default EditRecord;

const EditWrap = styled.section`
  height: 70vh;
  background-color: #2c2b2b;

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
      background-color: var(--point-color);
    }
  }

  .stretch-height {
    height: calc(100% - 40px);
  }

  .edit-body {
    height: 100%;

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

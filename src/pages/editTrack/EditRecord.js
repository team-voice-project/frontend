import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";

import { Container, Font } from "../../elements";
import ScriptMemo from "../../components/editTrack/ScriptMemo";
import Recorder from "../../components/editTrack/Recorder";
import ScriptView from "../../components/editTrack/ScriptView";
import { useDispatch } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const empty_voice = Object.values(voice_file).some((prop) => prop === null);
    if (empty_voice) {
      // console.log("보이스 파일 없음: ", voice_file);
      nextBtnRef.current.classList.remove("active");
    } else {
      // console.log("보이스 파일 있음: ", voice_file);
      nextBtnRef.current.classList.add("active");
    }
  }, [voice_file]);

  const handleClickBackBtn = () => {
    history.goBack();
  };

  const handleClickNextBtn = () => {
    for (const prop in voice_file) {
      if (voice_file[prop] === null) {
        alert("목소리가 준비되어있지 않아요 :(");
        return;
      }
    }

    dispatch(editTrackActions.saveAudio(voice_file));
    history.push("/edit/final");
  };

  return (
    <EditWrap>
      <Container padding={"0"}>
        <nav className={"edit-header"}>
          <button
            type={"button"}
            className={"back-btn"}
            onClick={handleClickBackBtn}
          >
            <RiArrowLeftSLine />
          </button>
          <button
            type={"button"}
            className={"next-btn"}
            onClick={handleClickNextBtn}
            ref={nextBtnRef}
          >
            <Font title={"true"} margin={"5px 0 0 0"}>
              다음
            </Font>
            <RiArrowRightSLine />
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
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 8px 0;

    .back-btn,
    .next-btn {
      border: 0;
      height: inherit;
      background: none;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 22px;

      svg {
        font-size: 32px;
      }
    }

    .next-btn {
      opacity: 0.5;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: auto;
      }
    }
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
    justify-content: space-between;
    flex-direction: column;

    &.active {
      top: 0;
      height: 100vh;
    }
  }
`;

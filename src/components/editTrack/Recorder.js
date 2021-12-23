import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Container } from "../../elements";
import StopWatch from "./StopWatch";

const Recorder = () => {
  const initial_controls = {
    record: true,
    pause: false,
    play: false,
  };
  const [controls, setControls] = useState(initial_controls);
  const [stopwatch_mode, setStopWatchMode] = useState("reset");
  const [recorder, setRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [runtime_memory, setRuntimeMemory] = useState(null);
  const playerRef = useRef(null);

  if (!navigator.mediaDevices) {
    return;
  }

  const getVoiceBlobUrl = () => {
    const voice_blob = new Blob(chunks, { type: "audio/ogg codecs=opus" });
    return URL.createObjectURL(voice_blob);
  };

  const handleClickOnRecord = () => {
    const device = navigator.mediaDevices.getUserMedia({ audio: true });
    device
      .then((stream) => {
        const voiceRecorder = new MediaRecorder(stream);

        // 사용자 동의 후 작동
        setControls({
          record: false,
          pause: true,
          play: false,
        });

        // 스톱워치 시작 & 녹음 객체 저장
        setStopWatchMode("start");
        setRecorder(voiceRecorder);

        // 목소리 데이터 저장
        voiceRecorder.ondataavailable = (e) => {
          chunks.push(e.data);

          if (voiceRecorder.state === "inactive") {
            playerRef.current.src = getVoiceBlobUrl();
          }
        };

        // 녹음 시작
        voiceRecorder.start();
      })
      .catch((err) => {
        console.log("보이스 레코더를 실행 할 수 없습니다." + err);
      });
  };

  const handleClickOffRecord = () => {
    setControls({
      record: false,
      pause: false,
      play: true,
    });

    setStopWatchMode("stop");
    // 녹음기 정지
    if (recorder.state === "recording") {
      recorder.stop();
    }
  };

  const handleClickPlayRecord = () => {
    console.log("재생 버튼 클릭됨");
    if (!recorder) {
      console.log("먼저 녹음해주세요.");
      return;
    }

    setControls({
      record: false,
      pause: true,
      play: false,
    });

    // 스톱워치 모드 플레이
    setStopWatchMode("play");

    // 오디오 태그 플레이
    playerRef.current.play();
  };

  return (
    <RecorderWrap>
      <Container>
        <audio className={"audio-el"} controls src="" ref={playerRef}>
          <code>audio</code> element.
        </audio>
        <div className={"main-controls"}>
          {controls.record && (
            <div className="control-item">
              <button
                type="button"
                className={"btn record on"}
                onClick={handleClickOnRecord}
              ></button>
              <span className={"btn-text"}> 녹음</span>
            </div>
          )}

          {controls.pause && (
            <div className="control-item ">
              <button
                type="button"
                className={"btn pause"}
                onClick={handleClickOffRecord}
              ></button>
              <span className={"btn-text"}>정지</span>
            </div>
          )}

          {controls.play && (
            <div className="control-item ">
              <button
                type="button"
                className={"btn play"}
                onClick={handleClickPlayRecord}
              ></button>
              <span className={"btn-text"}> 재생</span>
            </div>
          )}

          <StopWatch
            _className={"stopwatch"}
            mode={stopwatch_mode}
            setMode={setStopWatchMode}
            runtime_memory={runtime_memory}
            setRuntimeMemory={setRuntimeMemory}
            setControls={setControls}
            playerRef={playerRef}
          />
        </div>
      </Container>
    </RecorderWrap>
  );
};

export default Recorder;

const RecorderWrap = styled.div`
  position: relative;
  height: 40vh;
  padding: 40px;

  .audio-el {
    display: none;
  }

  .main-controls {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .control-item {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &.on {
      z-index: 1;
    }

    .btn {
      border: 0;
      background: none;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-bottom: 10px;
      cursor: pointer;

      &.record {
        background: #c85241;
      }

      &.pause {
        border: 2px solid #9422fc;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &::after {
          content: "";
          display: block;
          background: #fff;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      &.play {
        background: #fff;
      }
    }

    .btn-text {
      font-size: 12px;
    }
  }

  .stopwatch {
    font-size: 14px;
    text-align: center;
    margin-top: 5px;

    button {
      display: none;
    }
  }
`;

import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  AUDIO_TYPE_LIST,
  byteToMegaByte,
  convertAudio,
} from "../../shared/utils";

import { Container } from "../../elements";
import StopWatch from "../../shared/record/StopWatch";
import pushAudio from "../../shared/audio/push.mp3";
import { BsFillMicFill } from "react-icons/bs";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { ImFolder } from "react-icons/im";

const Recorder = ({
  setVoiceFile,
  setScriptActive,
  setScriptText,
  scriptRef,
}) => {
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
  const [has_audio, setHasAudio] = useState(false);
  const [upload_state_bubble, setUploadStateBubble] = useState(false);
  const playerRef = useRef(null);
  const uploaderRef = useRef(null);
  const systemAudioRef = useRef(null);
  const playBtnRef = useRef(null);
  const mainControlRef = useRef(null);

  if (!navigator.mediaDevices) {
    return;
  }

  const fileToMp3Convert = async (files) => {
    let sourceAudioFile = files;
    let targetAudioFormat = "mp3";
    return await convertAudio(sourceAudioFile, targetAudioFormat);
  };

  // 15728640 byte === 15 MB === 약 30분  // *.m4a
  const getVoiceBlobUrl = () => {
    const voice_blob = new Blob(chunks, { type: "audio/mp4" });
    // console.log("보이스 녹음 파일: ", voice_blob);
    const url = URL.createObjectURL(voice_blob);
    // 실제 서버로 넘길 보이스 파일 데이터 객체
    setVoiceFile({
      file: voice_blob,
      type: "record",
      url,
    });
    return url;
  };

  const handleClickOnRecord = () => {
    // 녹음 시 버튼 효과음 재생
    systemAudioRef.current.play();

    // 녹음&정지 버튼 반복 동작 방지
    mainControlRef.current.classList.add("prevent");
    setTimeout(() => {
      mainControlRef.current.classList.remove("prevent");
    }, 500);

    // 사용자 동의 후 작동
    setControls({
      record: false,
      pause: true,
      play: false,
    });

    // 스크립트 스크린 활성화
    setScriptActive(true);
    setScriptText(scriptRef.current.value);
    window.document.body.style.overflow = "hidden";

    // 녹음 시 버튼 효과음이 들어가는것을 방지하기 위해 효과음 runtime 만큼 딜레이 후 녹음 진행
    setTimeout(() => {
      const device = navigator.mediaDevices.getUserMedia({ audio: true });
      device
        .then((stream) => {
          const voiceRecorder = new MediaRecorder(stream);

          // 스톱워치 시작 & 녹음 객체 저장
          setStopWatchMode("start");
          setRecorder(voiceRecorder);
          setHasAudio(true);

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
    }, 240);
  };

  const handleClickOffRecord = () => {
    setControls({
      record: false,
      pause: false,
      play: true,
    });

    setStopWatchMode("stop");
    setScriptActive(false);
    window.document.body.style.overflow = "";

    // 녹음기 정지
    if (recorder?.state === "recording") {
      recorder.stop();
    } else {
      playerRef.current.pause();
    }

    const has_upload = uploaderRef.current?.files[0];
    if (has_audio || has_upload) {
      setTimeout(() => {
        setUploadStateBubble({ state: true, text: "녹음이 완료되었습니다." });
      }, 500);
    } else {
      setTimeout(() => {
        setUploadStateBubble({ state: false });
      }, 500);
    }
  };

  const handleClickPlayRecord = () => {
    // if (!recorder) {
    //   console.log("먼저 녹음해주세요.");
    //   return;
    // }

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

  const handleClickResetRecord = () => {
    setStopWatchMode("reset");
    setScriptActive(false);
    window.document.body.style.overflow = "";

    setChunks([]);
    setControls({
      record: true,
      pause: false,
      play: false,
    });

    playerRef.current.src = null;
    uploaderRef.current.value = null;
    setHasAudio(false);
    setVoiceFile({
      file: null,
      type: null,
      url: null,
    });
    setUploadStateBubble({ state: false });
  };

  const checkFileSize = (files) => {
    const file_size = files.size;
    const limit = 20 * 1024 * 1024;
    return file_size > limit;
  };

  const handleUploadAudioFile = async (e) => {
    let files = e.target.files[0];
    const is_audio = AUDIO_TYPE_LIST.some((type) => type === files.type);

    if (!is_audio) {
      alert("오디오 파일만 첨부 할 수 있습니다.");
      return;
    }

    // converting mp3 object
    const converted_files = await fileToMp3Convert(files);

    files = converted_files.file;

    const is_oversize = checkFileSize(files);
    if (is_oversize) {
      alert(
        "20MB 이하 파일만 등록할 수 있습니다.\n\n" +
          "현재파일 용량 : " +
          byteToMegaByte(files.size) +
          "MB"
      );
      return;
    }

    setUploadStateBubble({ state: true, text: "파일이 읽어들이는중.." });
    setStopWatchMode("reset");
    setScriptActive(false);
    window.document.body.style.overflow = "";

    setControls({
      record: false,
      pause: false,
      play: true,
    });

    const reader = new FileReader();
    const file = files;
    reader.readAsDataURL(file);

    playerRef.current.onloadedmetadata = function () {
      // 업로드 파일 재생시간이 Infinity 미만 일 경우에만 제한시간을 설정
      if (String(playerRef.current.duration) !== "Infinity") {
        let runtime = Math.floor(playerRef.current.duration * 1000);
        const timer_str = moment(runtime).format("mm:ss:SS");

        setRuntimeMemory(timer_str);
      }
    };

    reader.onloadend = () => {
      playerRef.current.src = reader.result;

      setVoiceFile({
        file: files,
        type: "upload",
        url: playerRef.current.src,
      });
    };

    setTimeout(() => {
      setUploadStateBubble({ state: true, text: "파일이 첨부되었습니다." });
    }, 500);
  };

  const repeat_visible =
    upload_state_bubble.state &&
    has_audio &&
    (stopwatch_mode === "stop" || stopwatch_mode === "reset");

  return (
    <RecorderWrap>
      <div className={"hidden-system-audio"}>
        <audio preload="auto" controls src={pushAudio} ref={systemAudioRef}>
          <code>audio</code> element.
        </audio>
      </div>
      <Container _className={"recorder-container"}>
        <audio
          className={"audio-el"}
          controls
          src=""
          ref={playerRef}
          preload="metadata"
        >
          <code>audio</code> element.
        </audio>

        {
          <div
            className={`file-save-state ${
              upload_state_bubble.state ? "slideUp" : ""
            }`}
          >
            <div className={"file-name"}>{upload_state_bubble.text}</div>
            <button
              type={"button"}
              className={"remove-file-btn"}
              onClick={handleClickResetRecord}
            >
              취소
            </button>
          </div>
        }

        <div className={"limit-guide"}>녹음 시간은 5분으로 제한됩니다.</div>

        <StopWatch
          _className={"stopwatch"}
          mode={stopwatch_mode}
          setMode={setStopWatchMode}
          runtime_memory={runtime_memory}
          setRuntimeMemory={setRuntimeMemory}
          setControls={setControls}
          playerRef={playerRef}
          has_audio={has_audio}
          has_upload={uploaderRef.current?.files[0]}
          recordLimitOff={handleClickOffRecord}
        />

        <div className={"main-controls"} ref={mainControlRef}>
          <div className={`side-item repeat ${!repeat_visible && "disabled"}`}>
            <button
              type="button"
              className={"btn repeat"}
              onClick={handleClickResetRecord}
            >
              <BsFillMicFill />
            </button>
            <span className={"btn-text"}>다시 녹음</span>
          </div>

          <div className="main-item">
            {controls.record && (
              <div className="item-box">
                <button
                  type="button"
                  className={"btn record on"}
                  onClick={handleClickOnRecord}
                >
                  <BsFillMicFill />
                </button>

                <span className={"btn-text"}>녹음</span>
              </div>
            )}

            {controls.pause && (
              <div className="item-box">
                <button
                  type="button"
                  className={"btn pause"}
                  onClick={handleClickOffRecord}
                >
                  <IoStopSharp className={"icon-pause"} />
                </button>
                <span className={"btn-text"}>정지</span>
              </div>
            )}

            {controls.play && (
              <div className="item-box" ref={playBtnRef}>
                <button
                  type="button"
                  className={"btn play"}
                  onClick={handleClickPlayRecord}
                >
                  <IoPlaySharp />
                </button>
                <span className={"btn-text"}>재생</span>
              </div>
            )}
          </div>

          <div className={`side-item upload ${has_audio && "disabled"}`}>
            <label className={"btn"}>
              <input
                type="file"
                onChange={handleUploadAudioFile}
                ref={uploaderRef}
                accept={"audio/*"}
              />
              <ImFolder />
            </label>
            <span className={"btn-text"}>파일 첨부</span>
          </div>
        </div>
      </Container>
    </RecorderWrap>
  );
};

export default Recorder;

const RecorderWrap = styled.div`
  height: 40vh;
  padding: 20px 40px 40px 40px;
  max-height: 216px;
  min-height: 216px;

  .hidden-system-audio {
    display: none;
  }

  .slideUp {
    animation-name: slideUp;
    -webkit-animation-name: slideUp;
    animation-duration: 0.7s;
    -webkit-animation-duration: 0.7s;
    animation-fill-mode: forwards;
    visibility: visible !important;
  }

  .recorder-container {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }

  .audio-el {
    display: none;
  }

  .limit-guide {
    font-size: 11px;
    //position: absolute;
    //top: -90px;
    //left: 50%;
    //transform: translateX(-50%);
    //width: 100%;
    //display: flex;
    //align-items: center;
    //justify-content: center;
  }

  .file-save-state {
    position: absolute;
    top: -102px;
    left: 0;
    right: 0;
    transform: translateY(100%);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 14px;
    height: 42px;
    border-radius: 22px;
    background: var(--point-color);
    max-width: 320px;
    width: 100%;
    opacity: 0;

    .file-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .remove-file-btn {
      font-size: 14px;
      background: none;
      border: 0;
      color: #fff;
      font-weight: bold;
    }
  }

  .main-controls {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    &.prevent {
      pointer-events: none;
    }

    .main-item {
      margin: 0 34px;
    }

    .item-box {
      display: flex;
      align-items: center;
      flex-direction: column;

      &.disabeld {
        pointer-events: none;
        opacity: 0.4;
      }
    }

    .btn {
      border: 0;
      background: none;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-bottom: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &.repeat {
        font-size: 21px;
      }

      &.record {
        color: #fff;
        background: var(--point-color);
        font-size: 21px;
      }

      &.pause {
        border: 2px solid var(--point-color);
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .icon-pause {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 20px;
        }

        &::after {
          content: "";
          display: block;
          background: var(--point-color);
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      &.play {
        font-size: 35px;
        background: #fff;
        color: var(--point-color);

        svg {
          position: relative;
          left: 3px;
        }
      }
    }

    .btn-text {
      font-size: 12px;
      white-space: nowrap;
    }
  }

  .side-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70px;

    .btn {
      width: 48px;
      height: 48px;
      color: #fff;
      background: #2c2b2b;
    }

    .btn-text {
      margin-top: 8px;
      font-size: 12px;
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    &.upload {
      input {
        display: none;
      }
    }
  }

  .stopwatch {
    font-size: 24px;
    text-align: center;
    flex-basis: 100%;
    margin-top: 5px;
    text-indent: 1px;

    button {
      display: none;
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      //transform: translateX(-50%) translateY(100%);
      transform: translateY(100%);
    }
    50% {
      //transform: translateX(-50%) translateY(-8%);
      transform: translateY(-8%);
    }
    65% {
      //transform: translateX(-50%) translateY(4%);
      transform: translateY(4%);
    }
    80% {
      //transform: translateX(-50%) translateY(-4%);
      transform: translateY(-4%);
    }
    95% {
      //transform: translateX(-50%) translateY(2%);
      transform: translateY(2%);
    }
    100% {
      opacity: 1;
      z-index: 1;
      //transform: translateX(-50%) translateY(0%);
      transform: translateY(0%);
    }
  }
`;

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "react-audio-element";

const SingleAudioPlayer = ({ audio }) => {
  const intervalRef = useRef(null);
  const runtimeRef = useRef(null);
  const endtimeRef = useRef(null);
  const [progress, setProgress] = useState(null);

  const getTimeInterval = () => {
    intervalRef.current = setInterval(() => {
      const now = runtimeRef.current.innerHTML.split(":").join("");
      const end = endtimeRef.current.innerHTML.split(":").join("");
      const percent = (now / end) * 100;
      setProgress(percent);
    }, 1000);
  };

  useEffect(() => {
    const text = document.querySelectorAll(".custom-time-text");

    runtimeRef.current = text[0];
    endtimeRef.current = text[1];
    getTimeInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <PlayerWrap progress={progress}>
      <AudioPlayer
        overrideStyles={true}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        colors={{
          sliderTrack: "#8A8A8A",
          slider: "#fff",
        }}
        classNames={{
          controlButton: "custom-control",
          playPause: "custom-play-pause",
          timeText: "custom-time-text",
          sliderTrack: "custom-slider-track",
        }}
      />
    </PlayerWrap>
  );
};

export default SingleAudioPlayer;

const PlayerWrap = styled.article`
  .react-audio-element {
    display: flex;
    flex-direction: column;
  }

  .custom-control:not(.custom-play-pause) {
    display: none;
  }

  .controls {
    margin: 0;
    margin-top: 10px;
  }

  .custom-play-pause {
    margin: 0;
    cursor: pointer;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    border-radius: 50%;
  }

  .time-track {
    position: relative;
    order: -1;

    .custom-time-text {
      position: absolute;
      font-size: 12px;

      &:first-child {
        top: -20px;
        left: 1px;
      }

      &:last-child {
        top: -20px;
        right: 1px;
      }
    }

    &::after {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      background: #fff;
      position: absolute;
      border-radius: 50%;
      top: 50%;
      margin-top: -5px;

      left: ${(props) => (props.progress ? props.progress + "%" : "0")};
    }
  }

  .custom-slider-track {
    width: 100%;
    height: 5px;
    border-radius: 4px;
    position: relative;
  }
`;

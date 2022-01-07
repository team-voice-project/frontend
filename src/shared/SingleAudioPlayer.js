import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const SingleAudioPlayer = ({ audio }) => {
  return (
    <PlayerWrap>
      <AudioPlayer
        timeFormat={"mm:ss"}
        defaultCurrentTime={"00:00"}
        src={audio}
      />
    </PlayerWrap>
  );
};

export default SingleAudioPlayer;

const PlayerWrap = styled.article`
  .rhap_container {
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: inherit;
    width: 100%;
    padding: 0;
    background: none;
    box-shadow: none;
  }

  .rhap_controls-section {
    order: -1;
    margin: 0 auto;
  }

  .rhap_additional-controls,
  .rhap_volume-controls {
    display: none;
  }

  .rhap_progress-container {
    margin: 0;
  }

  .rhap_progress-section {
    position: relative;
  }

  .rhap_time {
    color: #fff;
    font-size: 12px;
  }

  .rhap_current-time {
    position: absolute;
    top: -10px;
    left: 0;
  }

  .rhap_total-time {
    position: absolute;
    top: -10px;
    right: 0;
  }

  .rhap_main-controls {
    margin-bottom: 10px;

    [aria-label="Rewind"],
    [aria-label="Forward"] {
      display: none;
    }
  }

  .rhap_progress-bar-show-download {
    background-color: #2c2b2b;
  }

  .rhap_progress-filled {
    background-color: #fff;
  }

  .rhap_button-clear {
    svg {
      color: #fff;
    }
  }

  .rhap_progress-indicator {
    width: 10px;
    height: 10px;
    background: #fff;
    margin-left: -5px;
    top: -3px;
  }
`;

import "react-jinke-music-player/assets/index.css";
import "./custom.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import styled from "styled-components";
import TestMusic from "./Testplay.mp3";
import React from "react";

const MusicPlayer = (props) => {
  const audioLists = [
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자",
      cover: `${props.user_image}`,
      musicSrc: `${TestMusic}`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자",
      cover: `${props.user_image}`,
      musicSrc: `${TestMusic}`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자",
      cover: `${props.user_image}`,
      musicSrc: `${TestMusic}`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자",
      cover: `${props.user_image}`,
      musicSrc: `${TestMusic}`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자",
      cover: `${props.user_image}`,
      musicSrc: `${TestMusic}`,
    },
  ];

  const customLocale = {
    playModeText: {
      order: "순차재생",
      orderLoop: "반복",
      singleLoop: "한곡반복",
      shufflePlay: "랜덤반복",
    },
    playListsText: "재생목록",
  };

  return (
    <PlayerWrap>
      <ReactJkMusicPlayer
        audioLists={audioLists}
        mode="full"
        autoPlay={false}
        showMediaSession
        showDownload={false}
        showThemeSwitch={false}
        showReload={false}
        toggleMode={false}
        mobileMediaQuery="(max-width: 360px)"
        locale={customLocale}
      />
    </PlayerWrap>
  );
};

MusicPlayer.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

export default MusicPlayer;

const PlayerWrap = styled.article`
  .react-jinke-music-player-main
    .music-player-panel
    .panel-content
    .img-content {
    background-size: cover !important;
  }
`;

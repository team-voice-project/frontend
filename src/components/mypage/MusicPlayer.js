import "react-jinke-music-player/assets/index.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
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
  ];
  return (
    <div>
      <ReactJkMusicPlayer
        audioLists={audioLists}
        mode="full"
        autoPlay={false}
        showMediaSession
        showDownload={false}
        showThemeSwitch={false}
        showReload={false}
        mobileMediaQuery="(max-width: 360px)"
      />
    </div>
  );
};

MusicPlayer.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

export default MusicPlayer;

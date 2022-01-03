import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GLOBAL_PLAYER_ESCAPE_LIST } from "../../shared/utils";

import "react-jinke-music-player/assets/index.css";
import "./custom.css";
import ReactJkMusicPlayer from "react-jinke-music-player";

const MusicPlayer = (props) => {
  console.log(props);
  const { pathname } = useLocation();
  const [render, setRender] = useState(true);

  useEffect(() => {
    checkRenderState();
  }, []);

  const checkRenderState = () => {
    const is_correct = GLOBAL_PLAYER_ESCAPE_LIST.some(
      (url) => url === pathname
    );
    if (is_correct) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const audioLists = [
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자1",
      cover: `http://13.209.43.160/trackThumbnail/OAO1_face.png`,
      musicSrc: `http://13.209.43.160/olryqo19mzk1641044909620.ogg`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자2",
      cover: `http://13.209.43.160/trackThumbnail/OAO2_face.png`,
      musicSrc: `http://13.209.43.160/olryqo19mzk1641044909620.ogg`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자3",
      cover: `http://13.209.43.160/trackThumbnail/OAO3_face.png`,
      musicSrc: `http://13.209.43.160/olryqo19mzk1641044909620.ogg`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자4",
      cover: `http://13.209.43.160/trackThumbnail/OAO4_face.png`,
      musicSrc: `http://13.209.43.160/olryqo19mzk1641044909620.ogg`,
    },
    {
      name: "새벽에 듣기 좋은 나래이션",
      singer: "용용자5",
      cover: `http://13.209.43.160/trackThumbnail/OAO5_face.png`,
      musicSrc: `http://13.209.43.160/olryqo19mzk1641044909620.ogg`,
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
    <>
      {render && (
        <PlayerWrap>
          <ReactJkMusicPlayer
            audioLists={audioLists}
            mode="full"
            autoPlay={false}
            // showMediaSession={true}
            showDownload={false}
            showThemeSwitch={false}
            showReload={false}
            toggleMode={false}
            mobileMediaQuery="(max-width: 360px)"
            locale={customLocale}
            icon={{ delete: "비우기" }}
          />
        </PlayerWrap>
      )}
    </>
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

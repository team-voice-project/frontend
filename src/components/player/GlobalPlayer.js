import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSessionPlaylist,
  GLOBAL_PLAYER_ESCAPE_LIST,
} from "../../shared/utils";
import { actionCreators as playerActions } from "../../redux/modules/globalPlayer";
import { apis } from "../../shared/api";
import { newGetCookie } from "../../shared/Cookie";

import { BiPause } from "react-icons/bi";
import { HiOutlineSave } from "react-icons/hi";
import { IoCloseSharp, IoMusicalNotesSharp } from "react-icons/io5";
import { FaPlay, FaRegWindowMinimize } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";

/*
 * TODO:
 *  2) 일단 트랙 재생 시 플레이 리스트와 연동 되는 부분 더 테스트 할 것 (프로필 페이지)
 *  3) 플레이어 위젯 보이지 말아야 할곳 예외 처리 더 찾아 볼 것
 * */
const GlobalPlayer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [render, setRender] = useState(true);
  const [my_list, setMyList] = useState([]);
  const [play_list_modal, setPlayListModal] = useState(false);
  const displayRef = useRef(null);
  const PlayerRef = useRef(null);
  const playListRef = useRef(null);
  const store_play_list = useSelector((state) => state.globalPlayer.play_list);
  const now_track = useSelector((state) => state.globalPlayer.now_track);
  const globalPlayer = useSelector(
    (state) => state.globalPlayer.playerInstance
  );

  useEffect(() => {
    getPlayerInstance();
    setPlayerDisplay();
    initPlayList();
  }, []);

  useEffect(() => {
    checkRenderState();
  }, [pathname]);

  useEffect(() => {
    const playlist = getSessionPlaylist();
    setMyList(playlist);
  }, [store_play_list]);

  const initPlayList = () => {
    dispatch(playerActions.loadPlayList());
  };

  const getPlayerInstance = () => {
    const player = PlayerRef.current.audio.current;
    dispatch(playerActions.setPlayer(player));
  };

  const checkRenderState = () => {
    const is_correct = GLOBAL_PLAYER_ESCAPE_LIST.some(
      (url) => pathname.indexOf(url) > -1
    );

    if (is_correct) {
      if (globalPlayer) {
        globalPlayer.pause();
        globalPlayer.currentTime = 0;
      }
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const setPlayerDisplay = (track) => {
    if (!displayRef?.current) {
      return;
    }

    const displayEl = displayRef.current;
    const coverImgEl = displayEl.querySelector(".cover img");
    const titleEl = displayEl.querySelector(".title");
    const writerEl = displayEl.querySelector(".writer");

    coverImgEl.src = track?.cover.trackThumbnailUrlFace;
    titleEl.innerHTML = track?.name || "비어있음";
    writerEl.innerHTML = track?.singer || "비어있음";
  };

  const createPlayInfoEl = () => {
    return (
      <div className={"play-display"} ref={displayRef}>
        <div className={"cover"}>
          <img src="" alt="" />
        </div>
        <div className={"info"}>
          <span className={"title"}></span>
          <span className={"writer"}></span>
        </div>
      </div>
    );
  };

  const createPlayListOpenEl = () => {
    return (
      <button
        type={"button"}
        className={`playlist-open-btn ${play_list_modal ? "open" : ""}`}
        title={"플레이 리스트"}
        onClick={() => {
          setPlayListModal(!play_list_modal);
        }}
      >
        <TiArrowSortedUp />
      </button>
    );
  };

  const handlePauseToPlayList = () => {
    globalPlayer.pause();
  };

  const changePlayInfo = (track) => {
    const activeEl = playListRef.current?.querySelector(".active");
    if (activeEl) {
      activeEl.setAttribute("class", "list-item");
    }

    const targetEl = playListRef.current?.querySelector(
      `[data-id='${track.musicSrc}']`
    );

    const paused = targetEl?.classList?.contains("pause");
    if (paused) {
      targetEl?.classList.remove("pause");
    } else {
      targetEl?.classList.add("active");
    }
  };

  const handlePlayEvent = async (target_track) => {
    if (target_track?.type === "play") {
      // 플레이 리스트에서 선택하지 않았을때
      setPlayerDisplay(now_track);
      changePlayInfo(now_track);
    } else {
      // 플레이 리스트에서 트랙을 선택했을때
      setPlayerDisplay(target_track);
      changePlayInfo(target_track);

      // store -> play_list, now_track 정보 업데이트
      await dispatch(playerActions.play(target_track));
      globalPlayer.play();
    }
  };

  const handleOnEndEvent = () => {
    const activeEl = playListRef.current?.querySelector(".active");
    if (!activeEl) {
      return;
    }

    const paused = activeEl.classList.contains("pause");
    if (paused) {
      activeEl.classList.remove("pause");
    } else {
      activeEl.classList.add("pause");
    }

    activeEl.classList.remove("active");
  };

  const handleOnPauseEvent = () => {
    const activeEl = playListRef.current?.querySelector(".active");
    if (!activeEl) {
      return;
    }

    activeEl.classList.add("pause");
  };

  const resetPlayerDisplay = () => {
    globalPlayer.load();
    PlayerRef.current.currentTime = 0;
    setPlayerDisplay({
      name: "",
      singer: "",
      cover: "",
      musicSrc: "",
    });
  };

  const handleClearPlayList = async () => {
    await dispatch(playerActions.clearPlayList());
    resetPlayerDisplay();
    globalPlayer.pause();
  };

  const handleDeleteTrack = async (track_src) => {
    await dispatch(playerActions.deleteTrack(track_src));
    const playlist = getSessionPlaylist();
    setMyList(playlist);
    resetPlayerDisplay();
  };

  const sendMyPlayList = async () => {
    const play_list = getSessionPlaylist();
    if (!play_list) {
      alert("저장할 플레이 리스트가 없습니다 :(");
      return;
    }

    const play_id_list = play_list.map((track) => track.trackId);
    try {
      const res = await apis.savePlayList(play_id_list);
      alert("플레이 리스트가 저장되었습니다 :)");
    } catch (err) {
      console.log("플레이 리스트 저장 실패", err.response);
    }
  };

  const handleSavePlayList = () => {
    const is_login = newGetCookie("token");
    if (!is_login) {
      alert("로그인 후 저장하실수 있습니다 :(");
      return;
    }
    sendMyPlayList();
  };

  const handleTogglePlayItem = (li, track) => {
    const is_active = li.classList.contains("active");
    const is_paused = li.classList.contains("pause");

    if (is_active && is_paused) {
      handlePlayEvent(track);
      return;
    }

    if (is_active && !is_paused) {
      handlePauseToPlayList();
      return;
    }

    handlePlayEvent(track);
  };

  return (
    <PlayerWrap className={!render ? "hide" : ""}>
      <PlayerWidget>
        <AudioPlayer
          showJumpControls={false}
          ref={PlayerRef}
          autoPlay={true}
          className={"player-container"}
          timeFormat={"mm:ss"}
          defaultCurrentTime={"00:00"}
          src={now_track.musicSrc}
          customAdditionalControls={[createPlayInfoEl()]}
          customVolumeControls={[RHAP_UI.VOLUME, createPlayListOpenEl()]}
          onPlay={handlePlayEvent}
          onEnded={handleOnEndEvent}
          onPause={handleOnPauseEvent}
        />
      </PlayerWidget>

      <PlayListWidget className={play_list_modal ? "open" : ""}>
        <div className={"playlist-header"}>
          <span className={"title"}>
            플레이 리스트 ({my_list?.length ? my_list?.length : "0"})
          </span>

          <button
            type={"button"}
            className={"clear-btn"}
            onClick={handleClearPlayList}
          >
            비우기
          </button>
          <FaRegWindowMinimize
            className={"close-btn"}
            onClick={() => setPlayListModal(false)}
          />
        </div>
        <div className={"playlist-body"}>
          <div className={"playlist-content"}>
            <ul className={"list-wrap"} ref={playListRef}>
              {!my_list?.length ? (
                <div className={"empty-list"}>
                  <IoMusicalNotesSharp />
                  <span>플레이리스트가 없습니다.</span>
                </div>
              ) : (
                my_list.map((list, key) => {
                  const active =
                    list.trackId === now_track.trackId ? "active" : "";
                  const paused = active && globalPlayer.paused ? "pause" : "";
                  return (
                    <li
                      className={`list-item ${active} ${paused}`}
                      key={`play-list-id-${key}`}
                      data-id={list.musicSrc}
                    >
                      <div
                        className={"item-info"}
                        onClick={(e) =>
                          handleTogglePlayItem(
                            e.currentTarget.parentElement,
                            list
                          )
                        }
                      >
                        <div className={"cover"}>
                          <img src={list.cover.trackThumbnailUrlFace} alt="" />
                          <div className={"btn-control"}>
                            <button
                              type={"button"}
                              className={"icon-pause"}
                              // onClick={handlePauseToPlayList}
                            >
                              <BiPause />
                            </button>

                            <button
                              type={"button"}
                              className={"icon-play"}
                              // onClick={() => handlePlayEvent(list)}
                            >
                              <FaPlay />
                            </button>
                          </div>
                        </div>
                        <div className={"info"}>
                          <span className={"title"}>{list.name}</span>
                          <span className={"writer"}>{list.singer}</span>
                        </div>
                      </div>

                      <div className={"btn-group"}>
                        <button
                          type={"button"}
                          className={"delete-btn"}
                          onClick={() => handleDeleteTrack(list.musicSrc)}
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
            <div className={"save-my-list"} onClick={handleSavePlayList}>
              <span>지금 플레이 리스트를 나중에 또 듣고 싶다면 Click! :)</span>
              <button type={"button"} className={"save-btn"}>
                <HiOutlineSave />
              </button>
            </div>
          </div>
        </div>
      </PlayListWidget>
    </PlayerWrap>
  );
};

export default GlobalPlayer;

const PlayerWrap = styled.article`
  &.hide {
    display: none !important;
  }

  .rhap_container {
    background-color: #1d1d1d;
  }

  .rhap_progress-bar {
    height: 3px;
  }

  .rhap_progress-indicator {
    width: 12px;
    height: 12px;
    margin-left: -6px;
    top: -5px;
    background: #fff;
  }

  .rhap_stacked .rhap_controls-section {
    margin-top: 0;
  }

  .rhap_volume-indicator {
    opacity: 1;
  }

  .rhap_progress-bar-show-download {
    background-color: #4a4a4a;
  }

  .rhap_progress-filled {
    background-color: #fff;
  }

  .rhap_progress-container {
    margin: 0;
    height: auto;
  }

  .player-container {
    position: relative;
  }

  .rhap_main-controls {
    margin-top: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .rhap_play-pause-button {
      width: 35px;
      height: 35px;
      position: relative;
      top: -1.5px;
    }

    svg {
      width: 100%;
      height: 100%;
      color: #fff;
    }
  }

  .rhap_progress-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;

    .rhap_time {
      display: none;
    }
  }

  .rhap_volume-container {
    position: relative;
    flex: 0;
    margin-right: 10px;
    padding-top: 20px;
    top: -10px;

    &:hover {
      .rhap_volume-bar-area {
        display: block;
      }
    }

    .rhap_button-clear.rhap_volume-button {
      color: #fff;
    }

    .rhap_volume-bar-area {
      position: absolute;
      bottom: 26px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      background-color: #1d1d1d;
      border: 1px solid #4e4e4e;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
      padding: 10px 10px 12px 10px;
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .rhap_volume-controls {
      //display: none;
      flex-grow: 0;
      margin-left: 20px;

      .rhap_volume-container {
        display: none;
      }
    }

    .rhap_main-controls {
      position: static;
      transform: none;
    }
  }
`;

const PlayerWidget = styled.article`
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  z-index: 2000;

  .play-display {
    font-size: 13px;
    display: flex;
    align-items: center;

    .cover {
      width: 40px;
      height: 40px;
      margin-right: 15px;
      overflow: hidden;
      background-color: #585858;
      border-radius: 50%;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .title {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
      max-width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .writer {
      color: #a4a4a4;
      display: block;
    }
  }

  .playlist-open-btn {
    color: #fff;
    background: none;
    font-size: 24px;
    margin-top: 10px;

    svg {
      transition: transform 0.2s;
      transform: rotate(0);
    }

    &.open {
      svg {
        transform: rotate(-180deg);
      }
    }
  }
`;

const PlayListWidget = styled.article`
  position: fixed;
  bottom: -100%;
  right: 0;
  background: #1d1d1d;
  border: 1px solid #2e2e2e;
  width: 100%;
  max-width: 360px;
  z-index: 1000;
  transition: bottom 0.2s;

  &.open {
    bottom: 73px;
  }

  .playlist-header {
    padding: 9px 24px;
    border-bottom: 1px solid #2e2e2e;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .clear-btn {
      color: #fff;
      font-size: 11px;
      background: none;
      padding: 5px 12px;
      border: 1px solid #666;
      border-radius: 25px;
      margin-left: auto;

      &:hover {
        border-color: #999;
      }
    }

    .close-btn {
      font-size: 13px;
      cursor: pointer;
      margin-left: 15px;
    }
  }

  .playlist-body {
    padding-top: 10px;
  }

  .playlist-content {
    height: 518px;
  }

  .list-wrap {
    height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;

    .empty-list {
      color: #646464;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      opacity: 0.8;

      span {
        font-size: 14px;
        margin-top: 10px;
      }
    }

    .list-item {
      padding: 6px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background-color: #52525285;
      }

      &.active {
        background-color: #52525285;

        .btn-control {
          display: flex;

          .icon-pause {
            display: flex;
          }
        }
      }

      &.pause {
        .btn-control {
          .icon-pause {
            display: none !important;
          }

          .icon-play {
            display: flex !important;
          }
        }
      }

      &:not(.active):hover {
        .btn-control {
          display: flex;

          .icon-play {
            display: flex;
          }
        }
      }
    }
  }

  .save-my-list {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 24px;
    border-top: 1px solid #2e2e2e;
    font-size: 12px;
    color: #888;

    &:hover {
      color: #fff;
    }

    .save-btn {
      position: relative;
      top: 2px;
      font-size: 18px;
      background: none;
      color: inherit;
    }
  }

  .item-info {
    font-size: 13px;
    display: flex;
    align-items: center;
    flex: 1;

    .cover {
      width: 40px;
      height: 40px;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
      cursor: pointer;

      img {
        width: 100%;
        object-fit: cover;
      }

      .btn-control {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--point-color);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: none;

        .icon-play,
        .icon-pause {
          width: 100%;
          height: 100%;
          display: none;
          background: none;
          justify-content: center;
          align-items: center;

          svg {
            color: #fff;
          }
        }

        .icon-pause {
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .info {
      width: 100%;

      .title {
        display: block;
        font-size: 14px;
        margin-bottom: 5px;
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 200px;
      }

      .writer {
        color: #a4a4a4;
        display: block;
      }
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .delete-btn {
      width: 20px;
      height: 40px;
      color: #979797;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 426px) {
    position: fixed;
    top: 100%;
    right: 0;
    bottom: initial;
    max-width: 100%;
    height: calc(100vh - 66px);

    transition: top 0.2s;

    &.open {
      top: 0;
    }

    .playlist-body {
      height: calc(100% - 40px);
    }

    .playlist-content {
      height: 100%;
    }
  }
`;

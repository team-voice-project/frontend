import React from "react";
import styled from "styled-components";

import { Container, Font } from "../../elements";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

import { useSelector } from "react-redux";

const ShareTrack = () => {
  const track_info = useSelector((state) => state.editTrack);
  console.log("공유할 트랙 정보", track_info);
  return (
    <ShareWrap>
      <Container _className={"share-page-container"}>
        <div className={"greetings"}>
          <Font title fontSize={"20px"}>
            축하합니다! <br />
            나의 목소리를 공유해보아요!
          </Font>
        </div>

        <div className={"track-info"}>
          <div className={"emoticon"}></div>

          <div className={"track-tags"}>
            {track_info.tags.map((item, idx) => {
              return (
                <button
                  key={`tag-id-${idx}`}
                  type={"button"}
                  className={"tag-item"}
                >
                  {item}
                </button>
              );
            })}
            <button type={"button"} className={"tag-item"}>
              123
            </button>
            <button type={"button"} className={"tag-item"}>
              123
            </button>
            <button type={"button"} className={"tag-item"}>
              123
            </button>
          </div>

          <div className={"track-subject"}>
            <Font b fontSize={"18px;"}>
              {track_info.subject} 제목입니다.
            </Font>
          </div>
        </div>

        <div className={"player-widget"}>
          <SingleAudioPlayer />
        </div>

        <div className={"btn-group"}>
          <button type={"button"} className={"share-btn"}>
            공유하기
          </button>
          <button type={"button"} className={"mypage-btn"}>
            마이페이지로 가기
          </button>
        </div>
      </Container>
    </ShareWrap>
  );
};

export default ShareTrack;

const ShareWrap = styled.article`
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #000;

  .share-page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
  }

  .greetings {
    margin-top: 30px;
    line-height: 1.62;
  }

  .player-widget {
    position: relative;
    margin-bottom: 20px;
  }

  .track-info {
    .emoticon {
      width: 140px;
      height: 140px;
      background-color: #fff;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 30px;
    }

    .track-subject {
      font-size: 17px;
      margin-bottom: 15px;
    }

    .track-tags {
      margin-bottom: 12px;

      .tag-item {
        font-size: 13px;
        border: 0;
        color: #fff;
        border-radius: 30px;
        padding: 9px 11px;
        background-color: #2c2b2b;
        margin-right: 8px;
        min-width: 60px;
        font-family: "Pretendard Variable", serif;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .btn-group {
    display: flex;
    flex-direction: column;

    .share-btn,
    .mypage-btn {
      color: #fff;
      border: 0;
      width: 100%;
      height: 56px;
      background-color: var(--point-color);
      border-radius: 8px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

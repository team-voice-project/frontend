import React from "react";
import styled from "styled-components";

import { Container } from "../../elements";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

// 임시 테스트 음원파일
import pushAudio from "../../shared/audio/push.mp3";

const ShareTrack = () => {
  return (
    <ShareWrap>
      <Container _className={"share-page-container"}>
        <p className={"greetings"}>
          축하합니다!
          <br />
          나의 목소리를 공유해보아요!
        </p>

        <div className={"track-info"}>
          <div className={"emoticon"}></div>
          <div className={"track-subject"}>공유페이지 제목입니다.</div>
          <div className={"track-tags"}>
            <button type={"button"} className={"tag-item"}>
              깔끔한
            </button>
            <button type={"button"} className={"tag-item"}>
              깔끔한
            </button>
            <button type={"button"} className={"tag-item"}>
              깔끔한
            </button>
          </div>
        </div>

        <div className={"player-widget"}>
          <SingleAudioPlayer audio={pushAudio} />
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
  background: rgb(241, 19, 78);
  background: linear-gradient(
    349deg,
    rgba(241, 19, 78, 1) 0%,
    rgba(134, 113, 243, 1) 100%
  );

  .share-page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
  }

  .greetings {
  }

  .track-info {
    .emoticon {
      width: 180px;
      height: 180px;
      background-color: #000;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 15px;
    }

    .track-subject {
      font-size: 17px;
      margin-bottom: 15px;
    }

    .track-tags {
      .tag-item {
        font-size: 13px;
        border: 0;
        color: #fff;
        border-radius: 30px;
        padding: 9px 11px;
        background-color: #000;
        margin-right: 8px;

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
      background-color: #000;
      border-radius: 8px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

import React from "react";
import styled from "styled-components";

import { Container } from "../../elements";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

import { useSelector } from "react-redux";

const ShareTrack = () => {
  const track_info = useSelector((state) => state.editTrack);
  console.log("공유할 트랙 정보", track_info);
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
          <div className={"track-subject"}>{track_info.subject}</div>
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
          </div>
        </div>

        <div className={"player-widget"}>
          <SingleAudioPlayer
            audio={
              "https://cdn.mewpot.com/Refresh-wqHbZeK3wJaWt2nhaMizdE3q.mp3?token=st=1640413825~exp=1640424625~acl=/*~hmac=0a272ed26c7c396ce3a9d4b511d612d538c86181a0d188219857dcc5f205ef8b&response-content-disposition=attachment&filename=MP_%EC%83%81%EC%BE%8C%ED%95%9C%20%ED%95%98%EB%A3%A8.mp3"
            }
          />
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

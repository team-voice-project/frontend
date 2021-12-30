import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { apis } from "../../shared/api";

import { Container, Font, Button } from "../../elements";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";

const ShareTrack = ({ history }) => {
  const params = useParams();
  const [track_info, setTrackInfo] = useState(null);

  const getTrackInfo = async (id) => {
    const res = await apis.getTrackInfoDB(id);
    setTrackInfo(res.data.track);
  };

  useEffect(() => {
    const { track_id } = params;
    if (track_id) {
      getTrackInfo(track_id);
    } else {
      alert("공유 정보를 불러올 수 없습니다.");
    }
  }, []);

  const handleClickGoMypage = () => {
    history.push("/mypage");
  };

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
          <div className={"emoticon"}>
            <img
              src={track_info?.TrackThumbnail.trackThumbnailUrlFull}
              alt=""
            />
          </div>

          <div className={"track-tags"}>
            {track_info?.TrackTags.map((item, idx) => {
              return (
                <button
                  key={`tag-id-${idx}`}
                  type={"button"}
                  className={"tag-item"}
                >
                  {item.tag}
                </button>
              );
            })}
          </div>

          <div className={"track-subject"}>
            <Font b fontSize={"18px;"}>
              {track_info?.title}
            </Font>
          </div>
        </div>

        <div className={"player-widget"}>
          <SingleAudioPlayer audio={track_info?.trackUrl} />
        </div>

        <div className={"btn-group"}>
          <Button _className={"share-btn"}>공유하기</Button>
          <Button _className={"mypage-btn"} _onClick={handleClickGoMypage}>
            마이페이지로 가기
          </Button>
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
  padding-bottom: 40px;

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
      margin: 0 auto;
      margin-bottom: 30px;
      position: relative;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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
      border-radius: 6px;
      margin-bottom: 10px;
      font-size: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .share-btn {
      border: 0;
    }

    .mypage-btn {
      border: 3px solid #fff;
      color: #fff;
      background-color: #000;
    }
  }
`;

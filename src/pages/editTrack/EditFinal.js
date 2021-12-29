import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";
import { apis } from "../../shared/api";

import { Container } from "../../elements";
import { RiArrowLeftSLine } from "react-icons/ri";

const EditFinal = ({ history }) => {
  const dispatch = useDispatch();
  const [emo_list, setEmoList] = useState([]);
  const track_info = useSelector((state) => state.editTrack);
  const [send_track, setSendTrack] = useState(track_info);
  console.log("보낼 트랙 정보: ", send_track);

  useEffect(async () => {
    // 이모티콘 active 동작을 위해 객체 형식 변환
    const infos = await getEmoList();

    if (infos) {
      const formatted = infos.map((item, idx) => {
        // 선택된 이모티콘 정보가 있을 경우 해당 아이템을 active 그렇지 않을 경우 첫번째 아이템을 active
        const selected =
          item.trackThumbnailUrl === track_info.cover_url || idx === 0;
        if (selected) {
          // 초기 이모티콘 Url 정보 세팅
          setSendTrack({
            ...send_track,
            cover_url: item.trackThumbnailUrl,
          });

          return { id: idx, emo_url: item.trackThumbnailUrl, active: true };
        } else {
          return { id: idx, emo_url: item.trackThumbnailUrl, active: false };
        }
      });

      setEmoList(formatted);
    } else {
      alert(
        "목소리 업로드 페이지를 이용 할 수 없습니다 :( \n 관리자에게 문의하세요."
      );
      history.replace("/");
    }
  }, []);

  const getEmoList = async () => {
    try {
      const res = await apis.getMenuInfoDB();
      return res.data.trackThumbnail;
    } catch (err) {
      console.error("[getMenuInfo] 이모티콘 정보를 가져올 수 없습니다.");
      return null;
    }
  };

  const handleClickEmoItem = (idx) => {
    let url = null;
    const changed = emo_list.map((item) => {
      if (item.id === idx) {
        item.active = true;
        url = item.emo_url;
      } else {
        item.active = false;
      }

      return item;
    });

    setEmoList(changed);
    setSendTrack({
      ...send_track,
      cover_url: url,
    });
  };

  const handleUploadTrack = () => {
    const { audio_file, audio_url, category, subject, tags } = track_info;

    // 리덕스에 업로드 할 정보가 없을 경우 처음부터 다시 진행하도록..
    if (
      !tags.length ||
      category === "" ||
      subject === "" ||
      !audio_file ||
      audio_url === ""
    ) {
      alert("업로드할 정보를 찾을 수 없습니다. 처음부터 진행해주세요 :(");
      history.push("/edit/base");
      return;
    } else {
      const cover_url = emo_list.filter((item) => item.active)[0].emo_url;
      console.log("현재 선택된 커버 아이디", cover_url);
      const send_data = {
        ...track_info,
        cover_url,
      };

      console.log("send_data", send_data);
      dispatch(editTrackActions.sendUploadTrackData(send_data));
    }
  };

  const handleClickBackBtn = () => {
    history.goBack();
  };

  return (
    <EditWrap>
      <Container padding={"0"}>
        <nav className={"edit-header"}>
          <button
            type={"button"}
            className={"back-btn"}
            onClick={handleClickBackBtn}
          >
            <RiArrowLeftSLine />
          </button>
        </nav>
      </Container>

      <Container padding={"0px"}>
        <div className={"progress-bar"}>
          <div className={"progress-bar-content"} />
        </div>
      </Container>

      <Container padding={"20px"}>
        <div className={"edit-body"}>
          <strong className={"title"}>업로드하기</strong>

          <div className={"emoticon-box"}>
            <div className={"sub-title"}>이모티콘</div>
            <ul className={"emoticon-list"}>
              {emo_list.map((item, idx) => {
                const is_active = item.active ? "active" : "";
                return (
                  <li
                    key={`emo-id-${idx}`}
                    className={`emoticon-item ${is_active}`}
                    onClick={() => handleClickEmoItem(idx)}
                  >
                    <img src={item.emo_url} alt="" />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={"guide-text"}>
            작성을 완료하고
            <br />
            마이페이지에서 내 목소리를 확인해보세요!
          </div>
        </div>

        <button
          type={"button"}
          className={"upload-btn"}
          onClick={handleUploadTrack}
        >
          업로드하기
        </button>
      </Container>
    </EditWrap>
  );
};

export default EditFinal;

const EditWrap = styled.section`
  .edit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 8px 20px;

    .back-btn {
      border: 0;
      height: inherit;
      background: none;
      display: flex;
      align-items: center;
      color: #fff;

      svg {
        font-size: 24px;
      }
    }
  }

  .progress-bar {
    height: 2px;
    background-color: #ccc;

    .progress-bar-content {
      width: 100%;
      height: inherit;
      background-color: var(--point-color);
    }
  }

  .edit-body {
    .title {
      display: block;
      margin-bottom: 30px;
    }
  }

  .emoticon-box {
    margin-bottom: 40px;

    .sub-title {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }

  .emoticon-list {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;

    .emoticon-item {
      cursor: pointer;
      border-radius: 50%;
      margin: 7.5px;
      flex: 0 1 calc(33.33% - 15px);
      padding-bottom: 29%;
      background: #2c2b2b;
      position: relative;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        overflow: hidden;
      }

      &.active {
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          border: 4px solid var(--point-color);
        }
      }
    }
  }

  .guide-text {
    text-align: center;
    line-height: 1.82;
    font-size: 12px;
    margin-bottom: 60px;
  }

  .upload-btn {
    width: 100%;
    padding: 10px;
    border: 0;
    color: #fff;
    height: 56px;
    font-weight: bold;
    font-size: 17px;
    border-radius: 6px;
    background-color: var(--point-color);
  }
`;

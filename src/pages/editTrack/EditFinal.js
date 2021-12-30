import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";
import { apis } from "../../shared/api";

import { Container, Button } from "../../elements";
import { RiArrowLeftSLine } from "react-icons/ri";
import { HiCheck } from "react-icons/hi";

const EditFinal = ({ history }) => {
  const dispatch = useDispatch();
  const [emo_list, setEmoList] = useState([]);
  const track_info = useSelector((state) => state.editTrack);
  const [send_track, setSendTrack] = useState(track_info);
  const track_id = useLocation().state?.track_id; // history.push로 받아온 track_id

  useEffect(() => {
    initFinalPage();

    if (!send_track.subject) {
      alert(
        "작성중인 목소리 정보를 찾을 수 없습니다. 다시 처음부터 시도하세요."
      );

      if (track_id) {
        history.push(`/edit/base/${track_id}`);
      } else {
        history.push(`/edit/base`);
      }
    }

    return () => {};
  }, []);

  const initFinalPage = async () => {
    // 이모티콘 active 동작을 위해 객체 형식 변환
    const emo_info = await getEmoList();

    if (emo_info) {
      const formatted = emo_info.map((item, idx) => {
        return {
          id: idx,
          emo_url: item.trackThumbnailUrlFace,
          active: false,
        };
      });

      // 선택된 이모티콘 정보가 있을 경우 해당 아이템을 active 그렇지 않을 경우 첫번째 아이템을 active
      const active_idx = formatted.findIndex(
        (item) => item.emo_url === track_info.cover_url
      );

      if (active_idx > -1) {
        formatted[active_idx].active = true;
      } else {
        formatted[0].active = true;
      }

      setEmoList(formatted);
    } else {
      alert(
        "목소리 업로드 페이지를 이용 할 수 없습니다 :( \n 관리자에게 문의하세요."
      );

      history.replace("/");
    }
  };

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
      !category ||
      !subject ||
      // !audio_file ||
      !audio_url
    ) {
      alert("업로드할 정보를 찾을 수 없습니다. 처음부터 진행해주세요 :(");
      history.push("/edit/base");
      return;
    }

    const mode = track_id ? "update" : "upload";
    const cover_url = emo_list.filter((item) => item.active)[0].emo_url;
    const send_data = {
      ...track_info,
      cover_url,
      mode,
      track_id,
    };

    dispatch(editTrackActions.sendTrackData(send_data));
  };

  const handleClickBackBtn = () => {
    history.goBack();
  };

  return (
    <EditWrap>
      <nav className={"edit-header"}>
        <Container padding={"0"}>
          <button
            type={"button"}
            className={"back-btn"}
            onClick={handleClickBackBtn}
          >
            <RiArrowLeftSLine />
          </button>
        </Container>
      </nav>

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
                    <HiCheck className={"icon-check"} />
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

        <Button _className={"upload-btn"} _onClick={handleUploadTrack}>
          업로드하기
        </Button>
      </Container>
    </EditWrap>
  );
};

export default EditFinal;

const EditWrap = styled.section`
  .edit-header {
    position: sticky;
    top: 0;
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

      .icon-check {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 38px;
        color: var(--point-color);
        z-index: 1;
      }

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
        .icon-check {
          display: block;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          border: 4px solid var(--point-color);
        }
      }
    }
  }

  .guide-text {
    text-align: center;
    line-height: 1.82;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .upload-btn {
    width: 100%;
    padding: 10px;
    border: 0;
    color: #fff;
    height: 56px;
    font-size: 20px;
    border-radius: 6px;
    background-color: var(--point-color);
  }
`;

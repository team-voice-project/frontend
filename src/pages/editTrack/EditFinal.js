import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";

import { Container } from "../../elements";

const EditFinal = ({ history }) => {
  const dispatch = useDispatch();
  const initial_state = [
    { id: 0, emo_url: "", active: true },
    { id: 1, emo_url: "", active: false },
    { id: 2, emo_url: "", active: false },
    { id: 3, emo_url: "", active: false },
    { id: 4, emo_url: "", active: false },
    { id: 5, emo_url: "", active: false },
    { id: 6, emo_url: "", active: false },
    { id: 7, emo_url: "", active: false },
    { id: 8, emo_url: "", active: false },
  ];

  const [emo_list, setEmoList] = useState(initial_state);
  const track_info = useSelector((state) => state.editTrack);
  console.log("리덕스 트랙 데이터", track_info);

  const handleClickEmoItem = (idx) => {
    const changed = emo_list.map((item) => {
      if (item.id === idx) {
        item.active = true;
      } else {
        item.active = false;
      }

      return item;
    });

    setEmoList(changed);
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
      const cover_id = emo_list.filter((item) => item.active)[0].id;
      console.log("현재 선택된 커버 아이디", cover_id);
      const send_data = {
        ...track_info,
        cover_id,
      };

      console.log("send_data", send_data);
      dispatch(editTrackActions.sendUploadTrackData(send_data));
    }
  };

  return (
    <EditWrap>
      <Container padding={"0"}>
        <nav className={"edit-header"}>
          <button type={"button"}>뒤로가기</button>
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
                  ></li>
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
    justify-content: space-between;
    height: 40px;
    padding: 8px 20px;
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

      &.active {
        background: var(--point-color);
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

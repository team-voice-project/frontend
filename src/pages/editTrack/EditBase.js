import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";
import { apis } from "../../shared/api";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Container, Tag, Font } from "../../elements";
import OptModal from "../../components/editTrack/OptModal";
import CategoryList from "../../components/editTrack/CategoryList";
import TagList from "../../components/editTrack/TagList";

const EditBase = ({ history }) => {
  const dispatch = useDispatch();
  const track_id = useParams()?.track_id;
  const [menu_info, setMenuInfo] = useState(null);
  const [modal_state, setModalState] = useState(null);
  const [selected_cate, setSelectedCate] = useState("");
  const [selected_tag, setSelectedTag] = useState([]);
  const [subject, setSubject] = useState("");
  const [rest_data, setRestData] = useState({});
  const nextBtnRef = useRef(null);

  useEffect(async () => {
    initBasePage();
  }, []);

  useEffect(() => {
    if (selected_cate && selected_tag.length && subject) {
      nextBtnRef.current.classList.add("active");
    } else {
      nextBtnRef.current.classList.remove("active");
    }
  }, [selected_cate, selected_tag, subject]);

  const initBasePage = async () => {
    // 카테고리, 태그 정보 불러오기
    const menu_info = await getMenuData();
    if (menu_info) {
      setMenuInfo(menu_info);
    } else {
      alert(
        "목소리 업로드 페이지를 이용 할 수 없습니다 :( \n 관리자에게 문의하세요."
      );
      history.replace("/");
    }

    //  수정 시 기존 데이터 불러오기
    if (track_id) {
      const { TrackTags, title, category, trackUrl, TrackThumbnail } =
        await getTrackData(track_id);
      const reveal_tags = TrackTags.map((item) => item.tag);
      setSelectedCate(category);
      setSelectedTag(reveal_tags);
      setSubject(title);
      setRestData({
        audio_file: null,
        audio_url: trackUrl,
        audio_runtime: "00:00:00",
        cover_url: TrackThumbnail.trackThumbnailUrlFace,
      });
    }
  };

  const getTrackData = async (id) => {
    try {
      const res = await apis.getTrackInfoDB(id);
      return res.data.track;
    } catch (err) {
      console.error("[getTrackData] 트랙정보를 가져올 수 없습니다.");
      return null;
    }
  };

  const getMenuData = async () => {
    try {
      const res = await apis.getMenuInfoDB();
      return res.data;
    } catch (err) {
      console.error("[getMenuData] 카테고리, 태그 정보를 가져올 수 없습니다.");
      return null;
    }
  };

  const handleOpenTargetModal = (e) => {
    const modal_type = e.currentTarget.dataset.modalType;
    setModalState(modal_type);
  };

  const handleClickBackBtn = () => {
    history.replace("/mypage");
  };

  const handleClickNextBtn = () => {
    if (!selected_cate) {
      alert("카테고리를 지정해주세요.");
      return;
    }

    if (!selected_tag.length) {
      alert("태그를 지정해주세요.");
      return;
    }

    if (!subject) {
      alert("제목을 입력해주세요.");
      return;
    }

    let save_data = {
      category: selected_cate,
      tags: selected_tag,
      subject: subject,
      ...rest_data,
    };

    console.log("저장할 데이터", save_data);
    dispatch(editTrackActions.saveBase(save_data));

    if (track_id) {
      history.push({
        pathname: "/edit/final",
        state: { track_id },
      });
    } else {
      history.push("/edit/record");
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTag([
      ...selected_tag.filter((item) => {
        return item !== tag;
      }),
    ]);
  };

  const handleKeyUpSubject = (e) => {
    setSubject(e.target.value);
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
          <button
            type={"button"}
            className={"next-btn"}
            onClick={handleClickNextBtn}
            ref={nextBtnRef}
          >
            <Font title={"true"}>다음</Font>
            <RiArrowRightSLine />
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
          <strong className={"title"}>기본 설정하기</strong>

          <div className={"edit-controls"}>
            <span className={"category"}>
              {selected_cate ? (
                <span className={"selected"}>{selected_cate}</span>
              ) : (
                <span className={"default"}>카테고리 선택</span>
              )}
            </span>
            <button
              type={"button"}
              data-modal-type={"category"}
              className={"select-btn"}
              onClick={handleOpenTargetModal}
            >
              <RiArrowRightSLine />
            </button>
          </div>

          <div className={"edit-controls"}>
            <div className={"tag-list"}>
              {!selected_tag.length
                ? "태그 선택"
                : selected_tag.map((item, idx) => {
                    return (
                      <Tag
                        key={`tag-unit-${idx}`}
                        removable={"true"}
                        _onClick={() => handleRemoveTag(item)}
                      >
                        {item}
                      </Tag>
                    );
                  })}
            </div>

            <button
              type={"button"}
              data-modal-type={"tag"}
              className={"select-btn"}
              onClick={handleOpenTargetModal}
            >
              <RiArrowRightSLine />
            </button>
          </div>

          <div className={"edit-controls"}>
            <input
              type="text"
              placeholder={"녹음본 제목 작성"}
              onKeyUp={handleKeyUpSubject}
              defaultValue={subject}
            />
          </div>
        </div>
      </Container>

      {modal_state === "category" && (
        <OptModal>
          <CategoryList
            initial_list={menu_info.category}
            selected_cate={selected_cate}
            setSelectedCate={setSelectedCate}
            setModalState={setModalState}
          />
        </OptModal>
      )}

      {modal_state === "tag" && (
        <OptModal>
          <TagList
            initial_list={menu_info.tag}
            selected_tag={selected_tag}
            setSelectedTag={setSelectedTag}
            setModalState={setModalState}
          />
        </OptModal>
      )}
    </EditWrap>
  );
};

export default EditBase;

const EditWrap = styled.section`
  .edit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 8px 20px;

    .back-btn,
    .next-btn {
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

    .next-btn {
      opacity: 0.5;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  .select-btn {
    border: 0;
    height: inherit;
    background: none;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
  }

  .progress-bar {
    height: 2px;
    background-color: #ccc;

    .progress-bar-content {
      width: 33%;
      height: inherit;
      background-color: var(--point-color);
    }
  }

  .edit-body {
    .title {
      display: block;
      margin-bottom: 20px;
    }
  }

  .edit-controls {
    padding: 16.5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f4f4f4;

    .category {
      .default {
        color: #525252;
      }
    }

    .tag-list {
      color: #525252;

      button {
        border: 0;
        padding: 7px 13px 8.6px 13px;
        color: #fff;
        margin: 0 5px;
        border-radius: 20px;
        background-color: var(--point-color);
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    input {
      color: #fff;
      font-size: 16px;
      border: 0;
      width: 100%;
      background-color: #000;

      &::placeholder {
        color: #525252;
      }
    }
  }
`;

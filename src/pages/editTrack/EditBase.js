import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as editTrackActions } from "../../redux/modules/editTrack";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Container, Tag, Font } from "../../elements";
import OptModal from "../../components/editTrack/OptModal";
import CategoryList from "../../components/editTrack/CategoryList";
import TagList from "../../components/editTrack/TagList";

const EditBase = ({ history }) => {
  const dispatch = useDispatch();
  const [modal_state, setModalState] = useState(null);
  const [selected_cate, setSelectedCate] = useState("");
  const [selected_tag, setSelectedTag] = useState([]);
  const [subject, setSubject] = useState("");
  const nextBtnRef = useRef(null);

  useEffect(() => {
    if (selected_cate && selected_tag.length && subject) {
      nextBtnRef.current.classList.add("active");
    } else {
      nextBtnRef.current.classList.remove("active");
    }
  }, [selected_cate, selected_tag, subject]);

  const handleOpenTargetModal = (e) => {
    const modal_type = e.currentTarget.dataset.modalType;
    setModalState(modal_type);
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

    const save_data = {
      category: selected_cate,
      tags: selected_tag,
      subject: subject,
    };

    console.log("저장할 데이터", save_data);
    dispatch(editTrackActions.saveBase(save_data));
    history.push("/edit/record");
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
          <button type={"button"} className={"back-btn"}>
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
            />
          </div>
        </div>
      </Container>

      {modal_state === "category" && (
        <OptModal>
          <CategoryList
            selected_category={selected_cate}
            setSelectedCate={setSelectedCate}
            setModalState={setModalState}
          />
        </OptModal>
      )}

      {modal_state === "tag" && (
        <OptModal>
          <TagList
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

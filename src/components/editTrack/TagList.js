import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Tag, Button } from "../../elements";

const TagList = ({
  initial_list,
  selected_tag,
  setSelectedTag,
  setModalState,
}) => {
  const tag_list = initial_list; // 실제 태그 리스트 state
  const [active_list, setActiveList] = useState(selected_tag); // 초기 렌더링 + 클릭 동작 시 active 할 태그 리스트 정보 state
  const [apply_btn_disabled, setApplyBtnDisabled] = useState(true);

  useEffect(() => {
    if (!active_list.length) {
      setApplyBtnDisabled(true);
    } else {
      setApplyBtnDisabled(false);
    }
  }, [active_list]);

  if (!tag_list) {
    return "태그 없습니다.";
  }

  const checkSelectedTag = (tag_name) => {
    return active_list.includes(tag_name);
  };

  const handleClickTagItem = (tag_name) => {
    const isActive = checkSelectedTag(tag_name);

    if (!isActive && active_list.length > 2) {
      alert("이미 3가지를 선택하셨어요.");
      return;
    }

    if (isActive) {
      const filtered = active_list.filter((item) => item !== tag_name);
      setActiveList([...filtered]);
    } else {
      setActiveList([...active_list, tag_name]);
    }
  };

  return (
    <TagListyWarp>
      <div className={"tag-list"}>
        {tag_list.map((item, idx) => {
          const tag_name = item.tag;
          const isSelected = checkSelectedTag(tag_name);
          return (
            <Tag
              key={`tag-id-${idx}`}
              _className={`tag-item ${isSelected ? "on" : ""}`}
              _onClick={() => handleClickTagItem(tag_name)}
            >
              {tag_name}
            </Tag>
          );
        })}
      </div>

      <div className={"btn-position"}>
        <p className={"guide-text"}>원하는 태그를 3개 선택하여 설정하세요</p>
        <Container padding={"0"}>
          <Button
            _disabled={apply_btn_disabled}
            _onClick={() => {
              setSelectedTag(active_list);
              setModalState(null);
            }}
          >
            태그 선택하기
          </Button>
        </Container>
      </div>
    </TagListyWarp>
  );
};

export default TagList;

const TagListyWarp = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: 50px;

  .tag-list {
    width: 100%;
  }

  .tag-item {
    border: 0;
    padding: 10px 15px 11px 15px;
    color: #fff;
    background-color: #000;
    margin: 5px;
    margin-bottom: 16px;
    border-radius: 20px;

    &.on {
      background-color: var(--point-color);
    }
  }

  .btn-position {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .guide-text {
      font-size: 12px;
      text-align: center;
    }

    button {
      width: calc(100% - 40px);
      margin: 20px;
      padding: 10px;
      border: 0;
      color: #fff;
      height: 56px;
      font-size: 20px;
      border-radius: 6px;
      background-color: var(--point-color);
    }
  }
`;

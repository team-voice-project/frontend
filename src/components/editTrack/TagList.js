import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../elements";

const CategoryList = ({ selected_tag, setSelectedTag, setModalState }) => {
  const initial_list = ["여성적인", "깔끔한", "부드러움"]; // 실제 태그 리스트 DB를 받아올 변수
  const [tag_list, setTagList] = useState(initial_list); // 실제 태그 리스트 state
  const [active_list, setActiveList] = useState(["깔끔한"]); // 초기 렌더링 + 클릭 동작 시 active 할 태그 리스트 정보 state

  if (!tag_list) {
    return "태그 없습니다.";
  }

  const checkSelectedCate = (tag_name) => {
    return active_list.includes(tag_name);
  };

  const handleClickCateItem = (tag_name) => {
    const isActive = checkSelectedCate(tag_name);

    if (isActive) {
      const filtered = active_list.filter((item) => item !== tag_name);
      setActiveList([...filtered]);
    } else {
      setActiveList([...active_list, tag_name]);
    }
  };

  return (
    <CategoryWarp>
      <ul>
        {tag_list.map((tag_name, idx) => {
          const isSelected = checkSelectedCate(tag_name);
          return (
            <button
              type={"button"}
              key={`cate-id-${idx}`}
              className={`cate-item ${isSelected ? "on" : ""}`}
              onClick={() => handleClickCateItem(tag_name)}
            >
              {tag_name}
              <span className={"cate-img"}></span>
            </button>
          );
        })}
      </ul>

      <div className={"btn-position"}>
        <Container padding={"0"}>
          <button
            type={"button"}
            className={"apply-btn"}
            onClick={() => {
              setSelectedTag(active_list);
              setModalState(null);
            }}
          >
            카테고리 선택
          </button>
        </Container>
      </div>
    </CategoryWarp>
  );
};

export default CategoryList;

const CategoryWarp = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: 50px;

  ul {
    width: 100%;
  }

  .cate-item {
    position: relative;
    margin: 5px;

    &.on {
      border: 1px solid coral;
    }

    .cate-img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .btn-position {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    button {
      padding: 10px;
      width: 100%;
    }
  }
`;

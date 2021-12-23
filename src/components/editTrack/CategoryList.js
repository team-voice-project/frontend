import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../elements";

const CategoryList = ({
  selected_category,
  setSelectedCate,
  setModalState,
}) => {
  const initial_list = ["나래이션", "성대모사", "효과음"]; // 실제 카테고리 리스트 DB를 받아올 변수
  const [cate_list, setCateList] = useState(initial_list); // 실제 카테고리 리스트 state
  const [active_list, setActiveList] = useState("나래이션"); // 초기 렌더링 + 클릭 동작 시 active 할 카테고리 리스트 정보 state

  if (!cate_list) {
    return "카테고리가 없습니다.";
  }

  const checkSelectedCate = (cate_name) => {
    return active_list.includes(cate_name);
  };

  const handleClickCateItem = (cate_name) => {
    setActiveList(cate_name);
  };

  return (
    <CategoryWarp>
      <ul>
        {cate_list.map((cate_name, idx) => {
          const isSelected = checkSelectedCate(cate_name);
          return (
            <button
              type={"button"}
              key={`cate-id-${idx}`}
              className={`cate-item ${isSelected ? "on" : ""}`}
              onClick={() => handleClickCateItem(cate_name)}
            >
              {cate_name}
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
              setSelectedCate(active_list);
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
    width: calc(33.33% - 10px);
    padding-bottom: 24.5%;
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

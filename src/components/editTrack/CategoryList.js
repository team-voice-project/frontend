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
      <div className={"category-list"}>
        {cate_list.map((cate_name, idx) => {
          const isSelected = checkSelectedCate(cate_name);
          return (
            <button
              type={"button"}
              key={`cate-id-${idx}`}
              className={`cate-item ${isSelected ? "on" : ""}`}
              onClick={() => handleClickCateItem(cate_name)}
            >
              <span className={"cate-img"}></span>
              <span className={"cate-name"}>{cate_name}</span>
            </button>
          );
        })}
      </div>

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
            카테고리 선택하기
          </button>
        </Container>
      </div>
    </CategoryWarp>
  );
};

export default CategoryList;

const CategoryWarp = styled.div`
  height: 100%;

  .category-list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    padding-bottom: 50px;
  }

  .cate-item {
    width: calc(33.33% - 20px);
    margin: 10px;
    margin-bottom: 20px;
    background: none;
    border: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.on {
      .cate-img {
        position: relative;

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 5px solid var(--point-color);
          border-radius: 10px;
        }
      }
    }

    .cate-img {
      position: relative;
      padding-bottom: 100%;
      width: 100%;
      height: 100%;
      background-color: #858585;
      margin-bottom: 10px;
      border-radius: 12px;
      overflow: hidden;
    }

    .cate-name {
      color: #fff;
    }
  }

  .btn-position {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    button {
      width: calc(100% - 40px);
      margin: 20px;
      padding: 10px;
      border: 0;
      color: #fff;
      height: 56px;
      font-weight: bold;
      font-size: 17px;
      border-radius: 6px;
      background-color: var(--point-color);
    }
  }
`;

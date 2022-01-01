import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Container, Button } from "../../elements";
import { HiCheck } from "react-icons/hi";

const CategoryList = ({
  initial_list,
  selected_cate,
  setSelectedCate,
  setModalState,
}) => {
  const cate_list = initial_list; // 실제 카테고리 리스트 state
  const [active_list, setActiveList] = useState(selected_cate); // 초기 렌더링 + 클릭 동작 시 active 할 카테고리 리스트 정보 state
  const [apply_btn_disabled, setApplyBtnDisabled] = useState(true);

  useEffect(() => {
    if (!active_list.length) {
      setApplyBtnDisabled(true);
    } else {
      setApplyBtnDisabled(false);
    }
  }, [active_list]);

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
        {cate_list.map((item, idx) => {
          const cate_name = item.category;
          const img_src = item.categoryUrl;
          const isSelected = checkSelectedCate(cate_name);
          return (
            <button
              type={"button"}
              key={`cate-id-${idx}`}
              className={`cate-item ${isSelected ? "on" : ""}`}
              onClick={() => handleClickCateItem(cate_name)}
            >
              <div className={"cate-img"}>
                <img src={img_src} alt="" />
                <HiCheck className={"icon-check"} />
              </div>
            </button>
          );
        })}
      </div>

      <div className={"btn-position"}>
        <Container padding={"0"}>
          <Button
            _disabled={apply_btn_disabled}
            _onClick={() => {
              setSelectedCate(active_list);
              setModalState(null);
            }}
          >
            카테고리 선택하기
          </Button>
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
    height: calc(100% - 56px);
    width: 100%;
  }

  .cate-item {
    width: calc(33.33% - 20px);
    margin: 10px;
    margin-bottom: 18px;
    background: none;
    border: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

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

    &.on {
      .cate-img {
        position: relative;

        .icon-check {
          display: block;
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 5px solid var(--point-color);
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          width: calc(100% - 10px);
          height: calc(100% - 10px);
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

      img {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
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
      font-size: 20px;
      border-radius: 6px;
      background-color: var(--point-color);
    }
  }
`;

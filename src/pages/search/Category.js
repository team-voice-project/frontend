import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/category/Header";
import Font from "../../elements/Font";
import { actionCreators as postActions } from "../../redux/modules/post";

import { RiArrowLeftSLine } from "react-icons/ri";

const Category = (props) => {
  const dispatch = useDispatch();

  const category_list = useSelector((state) => state.post.Image_list);

  React.useEffect(() => {
    dispatch(postActions.loadImageDB());
  }, []);

  return (
    <div>
      <Header noHeader />
      <Wrap>
        <div style={{ marginBottom: "40px", padding: "0px 20px" }}>
          <Flex>
            <RiArrowLeftSLine
              cursor="pointer"
              size="32"
              onClick={() => {
                props.history.push("/");
              }}
            />
            <Font>카테고리</Font>
          </Flex>

          <Desc>카테고리에서 태그 조정을 통해 원하는 목소리를 찾아보세요</Desc>
        </div>

        <BoxWrap>
          {category_list &&
            category_list.map((l, idx) => {
              const categoryName = l.category;
              return (
                <Box key={idx}>
                  <Rectangle
                    src={l.categoryUrl}
                    onClick={() => {
                      props.history.push(`/category/${categoryName}`);
                    }}
                  ></Rectangle>
                </Box>
              );
            })}
        </BoxWrap>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const BoxWrap = styled.div`
  padding: 0px 12px;
`;

const Desc = styled.div`
  color: #ddd;
  font-size: 13px;
`;

const Rectangle = styled.img`
  cursor: pointer;
  width: 115px;
  height: 112px;
  background-color: #ddd;
  border-radius: 10px;

  @media screen and (max-width: 380px) {
    width: 105px;
    height: 100px;
  }
  @media screen and (max-width: 320px) {
    width: 85px;
    height: 82px;
  }
`;

const CategoryName = styled.div`
  font-size: 13px;
  margin: 16px 10px 0px 0px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #fff;
`;

const Box = styled.div`
  margin-bottom: 50px;
  text-align: center;
  float: left;
  margin: 0px 6px 34px 6px;
`;

export default Category;

import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../../components/category/Header";
import Text from "../../elements/Text";

const Category = () => {
  const location = useLocation();

  return (
    <div>
      <Header noHeader />
      <Wrap>
        <div style={{ marginBottom: "40px", padding: "0px 20px" }}>
          <Flex>
            <Icon></Icon>
            <Text>카테고리</Text>
          </Flex>

          <Desc>카테고리에서 태그 조정을 통해 원하는 목소리를 찾아보세요</Desc>
        </div>

        <BoxWrap>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
          <Box>
            <Rectangle></Rectangle>
            <CategoryName>전체</CategoryName>
          </Box>
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

const Rectangle = styled.div`
  width: 121px;
  height: 116px;
  background-color: #ddd;
  border-radius: 10px;
  background-image: url("/assets/kimkong.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  /* @media screen and (max-width: 375px) {
    width: 100px;
    height: 96px;
  } */
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

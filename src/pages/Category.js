import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../components/Header";
import Text from "../elements/Text";

const Category = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Wrap>
        <div style={{ marginBottom: "40px", padding: "0px 20px" }}>
          <Text>카테고리</Text>
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
  width: 120px;
  height: 112px;
  background-color: #ddd;
  border-radius: 10px;
`;

const CategoryName = styled.div`
  font-size: 13px;
  margin: 16px 10px 0px 0px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  margin-bottom: 50px;
  text-align: center;
  float: left;
  margin: 0px 6px 34px 6px;
`;

export default Category;

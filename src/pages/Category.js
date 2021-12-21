import React from "react";
import styled from "styled-components";
import Container from "../elements/Container";
import Text from "../elements/Text";

const Category = () => {
  return (
    <div>
      <Container>
        <div style={{ marginBottom: "40px" }}>
          <Text>카테고리</Text>
          <Desc>카테고리에서 태그 조정을 통해 원하는 목소리를 찾아보세요</Desc>
        </div>

        <Flex>
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
        </Flex>
      </Container>
    </div>
  );
};

const Desc = styled.div`
  color: #ddd;
  font-size: 13px;
`;

const Rectangle = styled.div`
  width: 120px;
  height: 110px;
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
`;

export default Category;

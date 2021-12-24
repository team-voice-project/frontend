import React from "react";
import styled from "styled-components";
import qs from "qs";

import Header from "../components/Header";
import { Container, Text } from "../elements/index";

const Search = () => {
  return (
    <div>
      <Header />
      <Container>
        <Flex>
          <Icon></Icon>
          <Text>검색</Text>
        </Flex>
        <Flex>
          <Multiline
            placeholder="검색어를 입력해주세요."
            type="text"
          ></Multiline>
          <Temp></Temp>
        </Flex>
      </Container>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Icon = styled.div`
  width: 18px;
  height: 32px;
  background-color: #ddd;
  margin-right: 12px;
`;

const Multiline = styled.input`
  border: none;
  background: none;
  border-bottom: solid 3px #ddd;
  padding: 12px 4px;
  width: 100%;

  :focus {
    border: none;
    background: none;
    border-bottom: solid 3px #fa007d;
  }
`;

const Temp = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ddd;
  margin-left: 8px;
`;

export default Search;

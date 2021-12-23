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
        <Text>검색</Text>
        <div>
          <input placeholder="제목, 이름 등 검색어 입력하기"></input>
          <Temp></Temp>
        </div>
        <Temp></Temp>
      </Container>
    </div>
  );
};

const Temp = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
`;

export default Search;

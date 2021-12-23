import React from "react";
import styled from "styled-components";
import qs from "qs";

import Header from "../components/Header";
import { Container, Text } from "../elements/index";

const Search = ({ location }) => {
  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, //물음표 빼기->값은 문자열
  });

  const detail = query.detail === "true";

  console.log(query);
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
        {detail && <p>detail값이 true</p>}
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

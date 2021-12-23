import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Container, Text } from "../elements/index";

const Search = () => {
  return (
    <div>
      <Header />
      <Container>
        <Text>검색</Text>
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

import React from "react";
import styled from "styled-components";
import { Container } from "../../elements";
import Header from "../../components/category/Header";

const Err = () => {
  return (
    <>
      <Header topMenu />
      <Container>
        <OAODiv>
          <OAOText>해당 카테고리의 게시물이 없습니다</OAOText>
          <OAOText>다른 카테고리를 선택해보세요!</OAOText>
          <OAO></OAO>
        </OAODiv>
      </Container>
    </>
  );
};

const OAODiv = styled.div`
  position: relative;
  top: 160px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 200px;
  height: 210px;
  margin: 55px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default Err;

import React from "react";
import styled from "styled-components";
import Container from "../elements/Container";

const Header = () => {
  return (
    <>
      <Wrap>
        <ImgDiv>
          <img></img>
        </ImgDiv>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  padding: 20px 20px 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const ImgDiv = styled.div`
  background-color: #dfdfdf;
  width: 100%;
  height: 8vh;
  border: none;
`;

export default Header;

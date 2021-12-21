import React from "react";
import styled from "styled-components";
import Container from "../elements/Container";

const Header = () => {
  return (
    <>
      <Container>
        <div>
          <ImgDiv>
            <img></img>
          </ImgDiv>
        </div>
      </Container>
    </>
  );
};

const ImgDiv = styled.div`
  background-color: #dfdfdf;
  width: 100%;
  height: 8vh;
  border: none;
`;

export default Header;

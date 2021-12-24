import React from "react";
import styled from "styled-components";

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
  padding: 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const ImgDiv = styled.div`
  background-color: #d4d1d1;
  width: 100%;
  height: 6vh;
  border: none;
`;

export default Header;

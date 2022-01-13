import React from "react";
import styled from "styled-components";

import { BsBellFill } from "react-icons/bs";

const Header = (props) => {
  const { topMenu, noHeader } = props;

  if (noHeader) {
    return (
      <>
        <Div></Div>
      </>
    );
  }

  if (topMenu) {
    return (
      <FlexSearchBar>
        <L></L>
        <FlexIcon>
          <BsBellFill cursor="pointer" size="22" />
        </FlexIcon>
      </FlexSearchBar>
    );
  }

  return (
    <>
      <Wrap>
        <Logo></Logo>
      </Wrap>
    </>
  );
};

const Div = styled.div`
  max-width: 425px;
  width: 100%;
  height: 20px;
`;

const Wrap = styled.div`
  padding: 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 50px;
`;

const Logo = styled.div`
  width: 80px;
  height: 25px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 20px;
`;

const FlexSearchBar = styled.div`
  display: flex;
  vertical-align: center;
  justify-content: space-between;
  padding: 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 60px;
  position: relative;
  padding-top: 20px;
`;

const L = styled.div`
  width: 60px;
  height: 28px;
  background-color: black;

  background-image: url("/assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const FlexIcon = styled.div`
  display: flex;
  vertical-align: center;
`;

const Temdiv = styled.div`
  width: 22px;
  height: 22px;
  margin-left: 18px;
  align-items: center;
  vertical-align: center;
`;

export default Header;

import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

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
          <Temdiv
            onClick={() => {
              history.push("/search");
            }}
          >
            검
          </Temdiv>
          <Temdiv>마</Temdiv>
          <Temdiv
            onClick={() => {
              history.push("/category");
            }}
          ></Temdiv>
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
  height: 52px;
`;

const Wrap = styled.div`
  padding: 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 100px;
  /* background-color: #d4d1d1; */
`;

const Logo = styled.div`
  width: 80px;
  height: 25px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 50px;
`;

const FlexSearchBar = styled.div`
  display: flex;
  vertical-align: center;
  justify-content: space-between;
  padding: 0px 20px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 83px;
  position: relative;
  top: 55px;
`;

const L = styled.div`
  width: 80px;
  height: 28px;
  background-color: #ddd;
`;

const FlexIcon = styled.div`
  display: flex;
  vertical-align: center;
`;

const Temdiv = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
  margin-left: 22px;
`;

export default Header;

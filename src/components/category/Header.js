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
        <L
          onClick={() => {
            history.push("/");
          }}
        ></L>
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
  cursor: pointer;

  background-image: url("/assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

export default React.memo(Header);

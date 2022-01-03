import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

import { HiOutlineSearch } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";

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
        <FlexIcon>
          <Temdiv>
            <HiOutlineSearch
              cursor="pointer"
              size="28"
              onClick={() => {
                history.push("/search");
              }}
            />
          </Temdiv>
          <Temdiv>
            <HiUser
              cursor="pointer"
              size="28"
              onClick={() => {
                history.push("/mypage");
              }}
            ></HiUser>
          </Temdiv>
          <Temdiv>
            <BsFillGridFill
              cursor="pointer"
              size="28"
              onClick={() => {
                history.push("/category");
              }}
            ></BsFillGridFill>
          </Temdiv>
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
  top: 20px;
`;

const L = styled.div`
  width: 80px;
  height: 28px;
  background-color: #ddd;
  cursor: pointer;
`;

const FlexIcon = styled.div`
  display: flex;
  vertical-align: center;
`;

const Temdiv = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 22px;
  align-items: center;
  vertical-align: center;
`;

export default Header;

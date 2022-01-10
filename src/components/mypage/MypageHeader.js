import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector } from "react-redux";

import { HiOutlineSearch } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";

const MypageHeader = (props) => {
  const { topMenu, noHeader } = props;

  const is_login = useSelector((state) => state.user.is_login);

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
              size="24"
              onClick={() => {
                history.push("/searchkeyword");
              }}
            />
          </Temdiv>
          {is_login === true ? (
            <Temdiv>
              <HiUser
                cursor="pointer"
                size="24"
                onClick={() => {
                  history.push("/mypage/rank_list");
                }}
              ></HiUser>
            </Temdiv>
          ) : (
            <Temdiv>
              <MdLogin
                cursor="pointer"
                size="24"
                onClick={() => {
                  history.push("/login");
                }}
              ></MdLogin>
            </Temdiv>
          )}

          <Temdiv>
            <BsFillGridFill
              cursor="pointer"
              size="24"
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
  background: white;
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
  background-color: #fff;
  cursor: pointer;

  background-image: url("/assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
`;

const FlexIcon = styled.div`
  display: flex;
  vertical-align: center;
  color: black;
`;

const Temdiv = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 18px;
  align-items: center;
  vertical-align: center;
`;

export default MypageHeader;

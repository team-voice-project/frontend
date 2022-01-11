import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector } from "react-redux";

import { AiFillHome } from "react-icons/ai";
import { BsBellFill } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";

const Footer = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const [activeNav, setActiveNav] = React.useState(1);

  return (
    <div>
      <Flex>
        <IconDiv
          className={activeNav === 1 ? "active" : "nav-item"}
          onClick={() => {
            setActiveNav(1);
            history.push("/");
          }}
        >
          <AiFillHome size="24px" cursor="pointer"></AiFillHome>
        </IconDiv>
        <IconDiv
          className={activeNav === 2 ? "active" : "nav-item"}
          onClick={() => {
            history.push("/category");
            setActiveNav(2);
          }}
        >
          <BsFillGridFill size="24px" cursor="pointer"></BsFillGridFill>
        </IconDiv>
        <IconDiv
          className={activeNav === 3 ? "active" : "nav-item"}
          onClick={() => {
            history.push("/searchkeyword");
            setActiveNav(3);
          }}
        >
          <HiOutlineSearch size="24px" cursor="pointer"></HiOutlineSearch>
        </IconDiv>
        <IconDiv
          className={activeNav === 4 ? "active" : "nav-item"}
          // onClick={() => {
          //   history.push("");
          //  setActiveNav(4)
          // }}
        >
          <IoMdChatboxes size="24px" cursor="pointer"></IoMdChatboxes>
        </IconDiv>
        {is_login === true ? (
          <IconDiv
            className={activeNav === 5 ? "active" : "nav-item"}
            onClick={() => {
              history.push("/mypage/rank_list");
              setActiveNav(5);
            }}
          >
            <HiUser size="24px" cursor="pointer"></HiUser>
          </IconDiv>
        ) : (
          <IconDiv
            className={activeNav === 5 ? "active" : "nav-item"}
            onClick={() => {
              history.push("/login");
              setActiveNav(5);
            }}
          >
            <MdLogin size="24px" cursor="pointer"></MdLogin>
          </IconDiv>
        )}
      </Flex>
    </div>
  );
};
const DIV = styled.div`
  cursor: pointer;
  .homeBtn {
    border: none;
  }
`;
const FormCheckLeft = styled.input`
  &:checked + ${DIV} {
    .homeBtn {
      color: #f1134e;
      size: 26px;
    }
  }
  display: none;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 35px;
  margin: 0 auto;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  background-color: #000;
  z-index: 2000;

  .nav-item {
    color: #7f7f7f;
  }

  .active {
    color: #f1134e;
  }
`;

const IconDiv = styled.div`
  width: 24px;
  height: 24px;
  /* background-color: #ddd; */
`;
export default Footer;

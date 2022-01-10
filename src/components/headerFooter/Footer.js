import React from "react";
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

  return (
    <div>
      <Flex>
        <IconDiv
          onClick={() => {
            history.push("/");
          }}
        >
          <AiFillHome size="24px" cursor="pointer"></AiFillHome>
        </IconDiv>
        <IconDiv
          onClick={() => {
            history.push("/category");
          }}
        >
          <BsFillGridFill size="24px" cursor="pointer"></BsFillGridFill>
        </IconDiv>
        <IconDiv
          onClick={() => {
            history.push("/searchkeyword");
          }}
        >
          <HiOutlineSearch size="24px" cursor="pointer"></HiOutlineSearch>
        </IconDiv>
        <IconDiv
        // onClick={() => {
        //   history.push("");
        // }}
        >
          <IoMdChatboxes size="24px" cursor="pointer"></IoMdChatboxes>
        </IconDiv>
        {is_login === true ? (
          <IconDiv
            onClick={() => {
              history.push("/mypage/rank_list");
            }}
          >
            <HiUser size="24px" cursor="pointer"></HiUser>
          </IconDiv>
        ) : (
          <IconDiv
            onClick={() => {
              history.push("/login");
            }}
          >
            <MdLogin size="24px" cursor="pointer"></MdLogin>
          </IconDiv>
        )}
      </Flex>
    </div>
  );
};

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
`;

const IconDiv = styled.div`
  width: 24px;
  height: 24px;
  /* background-color: #ddd; */
`;
export default Footer;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { FOOTER_ESCAPE_LIST } from "../../shared/utils";

import { AiFillHome } from "react-icons/ai";
import { IoMdChatboxes } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";

const Footer = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const pathName = useSelector((state) => state.router.location.pathname);
  const [render, setRender] = useState(true);

  const urlCheck = () => {
    const is_correct = FOOTER_ESCAPE_LIST.some(
      (url) => pathName.indexOf(url) > -1
    );

    if (is_correct) {
      setRender(false);
      window.document.body.style.paddingBottom = "";
    } else {
      setRender(true);
      window.document.body.style.paddingBottom = "200px";
    }
  };

  useEffect(() => {
    urlCheck();
  }, [pathName]);

  if (render === false) {
    return null;
  }

  return (
    <div>
      <Flex>
        <IconDiv
          className={pathName === "/" ? "active" : "nav-item"}
          onClick={() => {
            history.push("/");
          }}
        >
          <AiFillHome size="24px" cursor="pointer"></AiFillHome>
        </IconDiv>
        {/* {category()&&category()} */}
        <IconDiv
          className={
            pathName === "/category" ||
            pathName === "/tagcategory" ||
            pathName === "/category/전체" ||
            pathName === "/category/자유쥬제" ||
            pathName === "/category/ASMR" ||
            pathName === "/category/힐링응원" ||
            pathName === "/category/노래" ||
            pathName === "/category/외국어" ||
            pathName === "/category/나레이션" ||
            pathName === "/category/성대모사" ||
            pathName === "/category/유행어" ||
            pathName === "/category/효과음"
              ? "active"
              : "nav-item"
          }
          onClick={() => {
            history.push("/category");
          }}
        >
          <BsFillGridFill size="24px" cursor="pointer"></BsFillGridFill>
        </IconDiv>
        <IconDiv
          className={
            pathName === "/searchkeyword" || pathName === "/search"
              ? "active"
              : "nav-item"
          }
          onClick={() => {
            history.push("/searchkeyword");
          }}
        >
          <HiOutlineSearch size="24px" cursor="pointer"></HiOutlineSearch>
        </IconDiv>
        {/* {is_login === true ? (
          <IconDiv
            className={pathName === 4 ? "active" : "nav-item"}
            // onClick={() => {
            //   history.push(`/chat/${id}`);
            // }}
          >
            <IoMdChatboxes size="24px" cursor="pointer"></IoMdChatboxes>
          </IconDiv>
        ) : (
          <IconDiv
            className={pathName === "/login" ? "active" : "nav-item"}
            onClick={() => {
              window.alert("로그인이 필요한 페이지 입니다.");
              history.push("/login");
            }}
          >
            <IoMdChatboxes size="24px" cursor="pointer"></IoMdChatboxes>
          </IconDiv>
        )} */}

        {is_login === true ? (
          <IconDiv
            className={pathName === "/mypage/rank_list" ? "active" : "nav-item"}
            onClick={() => {
              history.push("/mypage/rank_list");
            }}
          >
            <HiUser size="24px" cursor="pointer"></HiUser>
          </IconDiv>
        ) : (
          <IconDiv
            className={pathName === "/login" ? "active" : "nav-item"}
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

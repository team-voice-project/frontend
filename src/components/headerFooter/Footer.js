import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { FOOTER_ESCAPE_LIST } from "../../shared/utils";
import { newGetCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";

import { AiFillHome } from "react-icons/ai";
import { IoMdChatboxes } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";

const Footer = () => {
  const pathName = useSelector((state) => state.router.location.pathname);
  const chat_rooms_info = useSelector((state) => state.chat.rooms);
  const uid = newGetCookie("uid");
  const [render, setRender] = useState(true);
  const [new_chat, setNewChat] = useState(true);

  useEffect(() => {
    checkDBNewMessage();
  }, []);

  useEffect(() => {
    const has_new_message = checkRealTimeNewMessage(chat_rooms_info);
    if (has_new_message) {
      setNewChat(true);
    } else {
      setNewChat(false);
    }
  }, [chat_rooms_info]);

  useEffect(() => {
    urlCheck();
  }, [pathName]);

  const checkDBNewMessage = async () => {
    const uid = newGetCookie("uid");

    // 비로그인시 새로운 메시지 체크하지 않음
    if (!uid) {
      return;
    }

    const res = await apis.checkNewMessage(uid);
    const empty_new_message = res.data?.roomCheck;
    if (empty_new_message) {
      setNewChat(false);
    } else {
      setNewChat(true);
    }
  };

  const checkRealTimeNewMessage = (rooms_info) => {
    const value_arr = Object.values(rooms_info);
    return value_arr.some((room) => room.new);
  };

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

  const createChatIconClass = () => {
    const entered = pathName === `/chat/${uid}`;
    let _class = "nav-item";

    if (new_chat && entered) {
      _class = "nav-item new active";
    }

    if (new_chat && !entered) {
      _class = "nav-item new";
    }

    if (!new_chat && entered) {
      _class = "nav-item active";
    }

    return _class;
  };

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

        {uid ? (
          <IconDiv
            className={createChatIconClass()}
            onClick={() => {
              history.push(`/chat/${uid}`);
            }}
          >
            <IoMdChatboxes size="24px" cursor="pointer" />
          </IconDiv>
        ) : (
          <IconDiv
            className="nav-item"
            onClick={() => {
              window.alert("로그인이 필요한 페이지입니다.");
              history.push("/login");
            }}
          >
            <IoMdChatboxes size="24px" cursor="pointer"></IoMdChatboxes>
          </IconDiv>
        )}

        {uid ? (
          <IconDiv
            className={
              pathName === "/mypage/rank_list" || pathName === "/mypage"
                ? "active"
                : "nav-item"
            }
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
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 426px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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

  &.new {
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--point-color);
      position: absolute;
      top: -4px;
      right: -4px;
    }
  }
`;
export default Footer;

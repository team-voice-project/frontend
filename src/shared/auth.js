import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { newGetCookie } from "./Cookie";

/**
 * Page 			: 해당 라우트에서 보여줄 페이지
 * checkAuth 	: 해당 라우트 AuthCheck 여부 (boolean)
 * return			: 해당 페이지와 react-router props(history, match, location)
 */

export default (Page, checkAuth) => {
  return (props) => {
    const dispatch = useDispatch();
    const nick = newGetCookie("nick");
    const token = newGetCookie("token");
    const is_login = Boolean(nick && token);

    useEffect(() => {
      // 로그인 쿠키정보가 있으면 리덕스 user 데이터 갱신
      if (is_login) {
        const user_data = { user: nick, is_login: is_login };
        dispatch(userActions.setUser(user_data));
      }
      // 로그인을 하지 않았는데 로그인 필요한 페이지에 있을 경우
      if (!is_login && checkAuth) {
        alert("로그인이 필요한 페이지 입니다.");
        props.history.push("/login");
      }

      // 이미 로그인하여 현재 페이지에 있을 필요가 없는 경우
      else if (is_login && !checkAuth) {
        props.history.push("/");
      }
    }, []);

    return <Page {...props} />;
  };
};

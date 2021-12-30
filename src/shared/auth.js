import React, { useEffect } from "react";
import { newGetCookie } from "./Cookie";

/**src/component/Router.js
 * Page 			: 해당 라우트에서 보여줄 페이지
 * checkAuth 	: 해당 라우트 AuthCheck 여부 (boolean)
 * return			: 해당 페이지와 react-router props(history, match, location)
 */
export default (Page, checkAuth) => {
  return (props) => {
    const nick = newGetCookie("nick");
    const token = newGetCookie("token");
    const is_login = nick && token;

    useEffect(() => {
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

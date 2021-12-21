import React from "react";
import KakaoLogin from "react-kakao-login";

const KakaoLoginBtn = () => {
  return (
    <KakaoLogin
      token={"23e2672b7fb246cd1e07d67172b8c6e3"}
      onSuccess={() => {
        console.log("로그인성공");
      }} // 성공 시 실행할 함수
      onFail={(err) => {
        console.log("로그인실패", err);
      }}
      onLogout={() => {
        console.log("로그아웃");
      }}
      render={({ onClick }) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          카카오로 로그인하기
        </div>
      )}
    ></KakaoLogin>
  );
};

export default KakaoLoginBtn;

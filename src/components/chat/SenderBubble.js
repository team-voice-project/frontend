import React from "react";
import styled from "styled-components";
import Profile from "../../pages/portfolioPage/profileIMG.png";

const SenderBubble = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div>
        <ProfileImg src={Profile} />
      </div>
      <SenderDiv>네네 알겠습니다.</SenderDiv>
      <Time>오후 8:00</Time>
    </div>
  );
};

export default SenderBubble;

const SenderDiv = styled.div`
  background: white;
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  max-width: 210px;
  border-radius: 0px 10px 10px 10px;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-left: 5px;
  align-items: end;
`;

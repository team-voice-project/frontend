import React, { useState } from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";

import MusicPlayer from "../../components/mypage/MusicPlayer";

const PortfolioPage = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };
  return (
    <Container>
      <div
        style={{
          background: "#2C2B2B",
          padding: "50px 10px 10px 10px",
          height: "100%",
        }}
      >
        <BackBtn>🥕</BackBtn>
        <Profile>
          <ImageCircle src={props.user_image} />
          <div>
            <Name>김용성</Name>
            <Link href="http://www.naver.com" target="_blank">
              sacoraa@naver.com
            </Link>
            <div style={{ width: "200px", wordBreak: "break-word" }}>
              <Text>
                안녕하세요. 저는 중후한 목소리를 가진 사람입니다. 자기소개란
                입니다.
              </Text>
            </div>
          </div>
        </Profile>
      </div>

      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          margin: "20px 0 0 0",
        }}
      >
        <label style={{ marginRight: "10px" }}>
          <FormCheckLeft
            type="radio"
            {...props}
            id={props.id}
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>트랙 리스트</FormCheckText>
        </label>
        <label>
          <FormCheckLeft
            type="radio"
            {...props}
            id={props.id}
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>좋아요 목록</FormCheckText>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0px",
        }}
      >
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
      <MusicPlayer />
    </Container>
  );
};

PortfolioPage.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};
const FormCheckText = styled.span`
  font-size: 15px;
  font-weight: 900;
  width: 110px;
  height: 35px;
  background: black;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #777;
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
  &:checked + ${FormCheckText} {
    background: white;
    color: black;
  }
  display: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 380px) {
    flex-direction: column;
  }
`;

const ImageCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
  border: 1px solid black;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 380px) {
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
  }
`;

const BackBtn = styled.button`
  width: 24px;
  height: 24px;
  margin: 0 0 20px 5px;
`;

const TrackBtn = styled.button`
  width: 96px;
  height: 28px;
  margin-right: 25px;
  border-radius: 20px;
  border: none;
  font-weight: 900;
  background-color: ${(props) => props.color};
  color: #565656;
`;

const Name = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
`;

const Link = styled.a`
  font-size: 15px;
  color: white;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: white;
`;

export default PortfolioPage;

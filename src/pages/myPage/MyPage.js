import React, { useState } from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";

import MusicPlayer from "../../components/mypage/MusicPlayer";

const MyPage = (props) => {
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
          background: "white",
          padding: "50px 10px 10px 10px",
          height: "100%",
        }}
      >
        <Profile>
          <ImageCircle src={props.user_image} />
          <div>
            <div style={{ display: "flex" }}>
              <Name>김용성</Name>
              <BackBtn>🥕</BackBtn>
            </div>
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
        <UpBtn>나의 목소리 올리기 </UpBtn>
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

MyPage.defaultProps = {
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
  margin-bottom: 20px;
`;

const UpBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 900;
  border-radius: 10px;
  border: none;
  background: #f1134e;
  color: white;
`;

const TrackBtn = styled.button`
  width: 96px;
  height: 28px;
  margin-right: 25px;
  border-radius: 20px;
  border: none;
  font-weight: 900;
`;

const Name = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const Link = styled.a`
  font-size: 15px;
  color: black;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

export default MyPage;

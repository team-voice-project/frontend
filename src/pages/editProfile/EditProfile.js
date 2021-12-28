import React from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import { getCookie } from "../../shared/Cookie";

const EditProfile = (props) => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BackBtn>뒤</BackBtn>
          <h1
            style={{
              fontSize: "28px",
              marginLeft: "10px",
              fontWeight: "900",
              color: "white",
            }}
          >
            프로필 설정
          </h1>
        </div>
        <BackBtn>완</BackBtn>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <ImageCircle src={props.user_image} />
        <ImgChangeBtn>프로필 사진 바꾸기</ImgChangeBtn>
      </div>
      <Line />
      <DescriptDiv>
        <Title>닉네임</Title>
        <Input type="text" placeholder="조은영"></Input>
      </DescriptDiv>
      <Line />
      <DescriptDiv>
        <Title>연락처</Title>
        <Input type="text" placeholder="sacoraa@naver.com"></Input>
      </DescriptDiv>
      <Line />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Title>자기소개</Title>
        <InputLast
          type="text"
          placeholder="안녕하세요. 저는 중후한 목소리를 가진 사람입니다."
        ></InputLast>
      </div>
    </Container>
  );
};

EditProfile.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

const ImageCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;
  border: 1px solid black;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const Line = styled.hr`
  background: #2c2b2b;
  height: 4px;
  border: none;
`;
const ImgChangeBtn = styled.button`
  background: none;
  color: #f1134e;
  border: none;
`;

const DescriptDiv = styled.div`
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
`;

const BackBtn = styled.button`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  width: 30%;
  font-size: 20px;
  padding: 0 0px 0 0;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  border: none;
  color: white;
  background: none;
`;

const InputLast = styled.textarea`
  width: 100%;
  height: 400px;
  border: none;
  background: none;
  color: white;
`;
export default EditProfile;

import React from "react";
import styled from "styled-components";
import { Container } from "../elements";

const CategoryModal = ({ setShowModal }) => {
  return (
    <>
      <BackGround
        onClick={() => {
          setShowModal(false);
        }}
      >
        <Wrap>
          <Modal>
            <TagDiv>
              <Tag>여성적인</Tag>
              <Tag>남성적인</Tag>
              <Tag>깔끔한</Tag>
              <Tag>부드러운</Tag>
              <Tag>유쾌한</Tag>
              <Tag>젠틀한</Tag>
              <Tag>귀여운</Tag>
              <Tag>중후한</Tag>
              <Tag>아이같은</Tag>
              <Tag>어른스러운</Tag>
              <Tag>잔잔한</Tag>
              <Tag>독특한</Tag>
              <Tag>친근한</Tag>
            </TagDiv>
          </Modal>

          <ButtonDiv>
            <Ment>태그 3개를 선택하여 원하는 목소리를 찾아보세요</Ment>
            <TagButton>
              <TextDiv>태그 적용하기</TextDiv>
            </TagButton>
          </ButtonDiv>
        </Wrap>
      </BackGround>
    </>
  );
};

const BackGround = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow-y: auto;
`;

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 60vh;
  background-color: #2c2b2b;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const TagDiv = styled.div`
  padding: 20px 30px;
  margin-top: 22px;
`;

const Tag = styled.button`
  max-width: 100px;
  height: 38px;
  padding: 0px 14px;
  background-color: #000;
  color: #fff;
  font-size: 13px;
  border-radius: 20px;
  border: none;
  text-align: center;
  align-items: center;
  margin: 0px 12px 20px 0px;
  float: left;

  &:hover {
    background-color: #ff1953;
  }
  @media screen and (max-width: 360px) {
    height: 28px;
    padding: 0px 14px;
    font-size: 11px;
    margin: 0px 8px 12px 0px;
  }
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  height: 140px;
  padding: 0px 30px;
`;

const Ment = styled.div`
  font-size: 13px;
  text-align: center;
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const TagButton = styled.button`
  position: relative;
  top: 20px;
  max-width: 425px;
  width: 100%;
  margin: 0px auto 30px auto;
  height: 7.5vh;
  background-color: #ff1953;
  border: none;
  z-index: 9999;
  border-radius: 12px;
`;

const TextDiv = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0px;
  @media screen and (max-width: 360px) {
    font-size: 17px;
  }
`;

export default CategoryModal;

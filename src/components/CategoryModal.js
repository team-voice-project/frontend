import React from "react";
import styled from "styled-components";
import { Container } from "../elements";

const CategoryModal = ({ setShowModal }) => {
  return (
    <>
      <BackGround
        onClick={() => {
          setShowModal(false);
          document.body.style.overflow = "unset";
        }}
      >
        <Modal>
          <TagDiv>
            <Tag>여성적인</Tag>
            <Tag>남성적인</Tag>
            <Tag>깔끔한</Tag>
            <Tag>부드러운</Tag>
            <Tag>유쾌한</Tag>
            <Tag>젠틀한</Tag>
            <Tag>귀여운</Tag>
          </TagDiv>
        </Modal>
        <Box>
          <TextDiv>태그 적용하기</TextDiv>
        </Box>
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
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 60vh;
  background-color: #fff;
  border-radius: 12px;
`;

const TagDiv = styled.div`
  padding: 40px 30px;
  margin-top: 22px;
`;

const Tag = styled.button`
  max-width: 100px;
  height: 34px;
  padding: 0px 12px;
  background-color: #acaaaa;
  color: #fff;
  font-size: 0.9em;
  border-radius: 20px;
  border: none;
  text-align: center;
  align-items: center;
  margin: 0px 12px 30px 0px;
  float: left;
`;

const Box = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 10vh;
  background-color: #505050;
  z-index: 9999;
`;

const TextDiv = styled.div`
  color: #fff;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0px;
`;

export default CategoryModal;

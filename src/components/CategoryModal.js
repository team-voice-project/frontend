import React from "react";
import styled from "styled-components";
import { Container } from "../elements";
import Header from "./Header";

const CategoryModal = ({ setShowModal }) => {
  return (
    <>
      <BackGround
        onClick={() => {
          setShowModal(false);
          document.body.style.overflow = "unset";
        }}
      >
        <Container>
          <Modal></Modal>
        </Container>
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
  top: 312px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 480px;
  background-color: #dddddd;
  border-radius: 12px;
  padding: 40px 20px;
`;

export default CategoryModal;

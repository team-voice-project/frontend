import React from "react";
import styled from "styled-components";

import { Container } from "../../elements";

const OptModal = (props) => {
  const { children } = props;

  return (
    <ModalWrap>
      <Container padding={"0"}>
        <div className={"modal-content"}>{children}</div>
      </Container>
    </ModalWrap>
  );
};

export default OptModal;

const ModalWrap = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  z-index: 9999;

  .modal-content {
    background-color: #2c2b2b;
    padding: 40px 20px;
    width: 100%;
    height: 80vh;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

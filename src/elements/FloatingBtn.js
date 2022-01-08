import React from "react";
import styled from "styled-components";
import { AiFillGift } from "react-icons/ai";

const FloatingBtn = () => {
  return (
    <IconDiv href="https://docs.google.com/forms/d/e/1FAIpQLSddqIx8oAZcKLY_ULBSrWUCbw-zjrwZoG6fPCictsELoSemKg/viewform">
      <AiFillGift
        style={{
          color: "F1134E",
        }}
        size="24"
      ></AiFillGift>
    </IconDiv>
  );
};

export default FloatingBtn;

const IconDiv = styled.a`
  width: 36px;
  height: 36px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 36px;
  position: fixed;
  right: 20px;
  bottom: 80px;
`;

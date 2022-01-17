import React from "react";
import styled from "styled-components";
import { AiFillGift } from "react-icons/ai";

const FloatingBtn = (props) => {
  const { bubble } = props;
  if (bubble) {
    return (
      <FloatingContainer>
        <IconDiv
          className="box"
          href="https://docs.google.com/forms/d/e/1FAIpQLSddqIx8oAZcKLY_ULBSrWUCbw-zjrwZoG6fPCictsELoSemKg/viewform"
        >
          <AiFillGift
            style={{
              color: "F1134E",
            }}
            size="24"
          ></AiFillGift>
          <Bubble className="arrow_box"></Bubble>
        </IconDiv>
      </FloatingContainer>
    );
  }
  return (
    <FloatingContainer>
      <IconDiv href="https://docs.google.com/forms/d/e/1FAIpQLSddqIx8oAZcKLY_ULBSrWUCbw-zjrwZoG6fPCictsELoSemKg/viewform">
        <AiFillGift
          style={{
            color: "F1134E",
          }}
          size="24"
        ></AiFillGift>
      </IconDiv>
    </FloatingContainer>
  );
};

const FloatingContainer = styled.div`
  max-width: 425px;
  width: 100%;
  position: fixed;
  bottom: 112px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-right: 10px;
`;

const IconDiv = styled.a`
  display: block;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 36px;
  padding: 6px;
  position: relative;

  &:hover .arrow_box {
    visibility: visible;
  }
`;

const Bubble = styled.div`
  position: absolute;
  right: 40px;
  bottom: 5px;
  width: 105px;
  height: 28px;
  visibility: hidden;

  background-image: url("/assets/images/bubbleImg.svg");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default FloatingBtn;

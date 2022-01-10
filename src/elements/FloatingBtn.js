import React from "react";
import styled from "styled-components";
import { AiFillGift } from "react-icons/ai";

const FloatingBtn = (props) => {
  const { bubble } = props;
  if (bubble) {
    return (
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
    );
  }
  return (
    <div>
      <IconDiv href="https://docs.google.com/forms/d/e/1FAIpQLSddqIx8oAZcKLY_ULBSrWUCbw-zjrwZoG6fPCictsELoSemKg/viewform">
        <AiFillGift
          style={{
            color: "F1134E",
          }}
          size="24"
        ></AiFillGift>
      </IconDiv>
    </div>
  );
};

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
  bottom: 130px;

  &:hover .arrow_box {
    visibility: visible;
  }
`;

const Bubble = styled.div`
  width: 105px;
  height: 28px;
  position: fixed;
  right: 60px;
  bottom: 132px;
  visibility: hidden;

  background-image: url("/assets/images/bubbleImg.svg");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default FloatingBtn;

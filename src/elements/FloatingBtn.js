import React from "react";
import styled from "styled-components";
import { AiFillGift } from "react-icons/ai";

const FloatingBtn = () => {
  return (
    <Wrap id="menu">
      <Div>
        <IconDiv href="https://docs.google.com/forms/d/e/1FAIpQLSddqIx8oAZcKLY_ULBSrWUCbw-zjrwZoG6fPCictsELoSemKg/viewform">
          {/* <AiFillGift
            style={{
              color: "F1134E",
            }}
            size="24"
          ></AiFillGift> */}
          <Bubble className="arrow_box"></Bubble>
        </IconDiv>
      </Div>
    </Wrap>
  );
};

export default FloatingBtn;

const Wrap = styled.div`
  width: 100px;
  margin: 40px auto;
  background: #f3f3f3;
  border: 1px solid #d8d8d8;
  text-align: center;
`;

const Div = styled.div`
  position: relative;
  display: inline-block;
`;

const IconDiv = styled.a`
  display: block;
  width: 80px;
  padding: 2px 16px;
  cursor: pointer;
`;

const Bubble = styled.div`
  display: none;
  position: absolute;
  width: 100px;
  padding: 8px;
  left: 0;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;

  /* background-image: url("/assets/images/bubbleImg.png");
  background-repeat: no-repeat;
  background-size: cover; */

  &:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: " ";
  }
`;

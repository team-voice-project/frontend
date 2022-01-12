import React from "react";
import styled from "styled-components";

const DatetimeLine = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Line></Line>
      <Time>2022.01.01</Time>
      <Line></Line>
    </div>
  );
};

export default DatetimeLine;

const Line = styled.div`
  width: 50%;
  height: 1px;
  background: #2c2b2b;
`;

const Time = styled.p`
  font-size: 14px;
  color: #2c2b2b;
  margin: 0px 3px;
  font-weight: 400;
`;

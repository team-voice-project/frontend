import React from "react";
import styled from "styled-components";

const RecieverBubble = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Time>오후 8:00</Time>
      <SenderDiv>
        네네 알겠습니다. 요청 주신 샘플대로 진행하여 보내드리도록 하겠슴둥
      </SenderDiv>
    </div>
  );
};

export default RecieverBubble;

const SenderDiv = styled.text`
  background: #f1134e;
  color: white;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  max-width: 210px;
  border-radius: 10px 0px 10px 10px;
`;

const Time = styled.p`
  display: flex;
  color: #818181;
  font-size: 12px;
  margin-right: 5px;
  align-items: end;
`;

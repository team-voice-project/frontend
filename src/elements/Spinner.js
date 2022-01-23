import React from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";

const Spinner = (props) => {
  const { small } = props;

  if (small) {
    return (
      <Div>
        <ScaleLoader
          height="20px"
          width="2px"
          color="#F1134E"
          radius="2px"
          margin="2px"
        />
      </Div>
    );
  }

  return (
    <Div>
      <ScaleLoader
        height="35px"
        width="4px"
        color="#F1134E"
        radius="2px"
        margin="2px"
      />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;

import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { margin, fontSize, children } = props;

  const styles = {
    margin,
    fontSize,
  };

  return <TitleText {...styles}>{children}</TitleText>;
};

Text.defaultProps = {
  margin: false,
  fontSize: false,
};

const TitleText = styled.div`
  margin: 18px 0px;
  font-size: 24px;
  font-weight: 700;
`;

export default Text;

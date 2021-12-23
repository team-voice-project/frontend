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
  fontSize: "false",
};

const TitleText = styled.div`
  margin: 13px 0px;
  font-size: 23px;
  font-weight: 900;
`;

export default Text;

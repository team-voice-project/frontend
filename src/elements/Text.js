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
  margin: 18px 0px;
  font-family: "GmarketSansBold", serif;
  font-size: 23px;
  font-weight: 900;
  @media screen and (max-width: 360px) {
    font-size: 19px;
    font-weight: 550;
  }
`;

export default Text;

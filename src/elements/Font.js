import React from "react";
import styled from "styled-components";

const Font = (props) => {
  const {
    margin,
    fontWeight,
    color,
    fontSize,
    title,
    m,
    b,
    children,
    _className,
  } = props;

  const styles = {
    margin,
    fontWeight,
    color,
    fontSize: fontSize,
    className: _className,
  };

  if (title) {
    return <FontWrap {...styles}>{children}</FontWrap>;
  }

  if (m) {
    return <MediumFont {...styles}>{children}</MediumFont>;
  }

  if (b) {
    return <BoldFont {...StyleSheetList}>{children}</BoldFont>;
  }

  return <RegularFont {...styles}>{children}</RegularFont>;
};

Font.defaultProps = {
  margin: false,
  color: "inherit",
  fontSize: "inherit",
};

const FontWrap = styled.div`
${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  font-family:'Black Han Sans', serif;
  margin ${(props) => props.margin};
  font-weight:500; 
`;

const RegularFont = styled.div`
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  font-family: "Pretendard Variable", serif;
  font-weight:400;
  color: ${(props) => props.color};
  margin ${(props) => props.margin};
`;

const MediumFont = styled.div`
  font-size: 16px;
  font-family: "Pretendard Variable", serif;
  font-weight: 500;
  ${(props) => props.margin && props.margin + "px;"}
`;

const BoldFont = styled.div`
${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
font-family: "Pretendard Variable", serif;
  font-weight:700;
  margin ${(props) => props.margin};
  `;

export default Font;

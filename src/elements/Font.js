import React from "react";
import styled from "styled-components";

const Font = (props) => {
  const { margin, fontWeight, color, fontSize, title, m, b, children } =
    props;

  const styles = {
    margin,
    fontWeight,
    color,
    fontSize: fontSize,
  };

  if (title) {
    return <FontWrap {...styles}>{children}</FontWrap>;
  }

  if (m) {
    return <MediumFont {...styles}>{children}</MediumFont>;
  }

  if (b) {
    return <BoledFont {...StyleSheetList}>{children}</BoledFont>;
  }

  return <RegularFont {...styles}>{children}</RegularFont>;
};

Font.defaultProps = {
  margin: false,
  color: false,
  fontSize: false,
};

const FontWrap = styled.div`
${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  font-family:"Black Han Sans";
  margin ${(props) => props.margin};
`;

const RegularFont = styled.div`
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  font-family:"pretendard";
  font-weight:400;
  color: ${(props) => props.color};
  margin ${(props) => props.margin};
`;

const MediumFont = styled.div`
  font-size:16px;
  font-family:"pretendard";
  font-weight:500;
  margin ${(props) => props.margin};
  `;

const BoledFont = styled.div`
${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
    font-family:"pretendard";
  font-weight:700;
  margin ${(props) => props.margin};
  `;

export default Font;

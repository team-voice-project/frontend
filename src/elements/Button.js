import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { bg, children, _onClick, _disabled, margin, border, _className, _id } =
    props;

  const styles = {
    bg,
    margin,
    border,
    className: _className,
    id: _id,
  };

  return (
    <ButtonWrap
      type={"button"}
      {...styles}
      onClick={_onClick}
      disabled={_disabled}
    >
      {children}
    </ButtonWrap>
  );
};

Button.defaultProps = {
  bg: false,
  margin: "",
  border: false,
};

const ButtonWrap = styled.button`
  font-family: "GmarketSansBold", serif;
  font-size: 20px;
  width: 100%;
  height: 60px;
  color: white;
  border-radius: 10px;
  ${(props) => (props.bg ? "background:#F1134E;" : "background:black;")}
  ${(props) => (props.border ? "border: 3px solid #fff;" : "")}
  margin: ${(props) => props.margin};

  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;

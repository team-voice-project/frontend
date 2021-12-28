import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { bg, children, _onClick, _disabled, margin } = props;

  console.log("버튼 disabled", _disabled);
  const styles = {
    bg,
    margin,
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
};

const ButtonWrap = styled.button`
  font-family: "Black Han Sans", serif;
  width: 100%;
  height: 50px;
  color: white;
  border-radius: 10px;
  border: none;
  ${(props) => (props.bg ? "background:#F1134E;" : "background:black;")}
  margin: ${(props) => props.margin};

  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;

import React from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

const Tag = (props) => {
  const { children, _onClick, _className, removable } = props;

  const styles = {
    onClick: _onClick,
    className: _className,
  };

  if (removable === "true") {
    return (
      <RemovableTag type="button" {...styles}>
        {children}
        <IoCloseSharp />
      </RemovableTag>
    );
  }

  return (
    <TagWrap type="button" {...styles}>
      {children}
    </TagWrap>
  );
};

Tag.defaultProps = {
  removable: "false",
};

const TagWrap = styled.button`
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
  border: 0;
  padding: 10px 15px 11px 15px;
  color: #fff;
  background-color: #000;
  margin: 5px;
  margin-bottom: 16px;
  border-radius: 20px;

  &.on {
    background-color: var(--point-color);
  }
`;

const RemovableTag = styled.button`
  display: flex;
  align-items: center;
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
  border: 0;
  padding: 10px 15px 11px 15px;
  color: #fff;
  background-color: var(--point-color);
  margin: 5px;
  margin-bottom: 16px;
  border-radius: 20px;

  svg {
    position: relative;
    top: 1px;
    right: -3px;
    margin-left: 3px;
  }
`;

export default Tag;

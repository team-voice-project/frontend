import React from "react";
import styled from "styled-components";

const DetailTag = (props) => {
  const { bg } = props;

  const styles = {
    bg,
  };

  return (
    <div>
      <Tag {...styles}>{props.tag}</Tag>
    </div>
  );
};
DetailTag.defaultProps = {
  bg: "",
};
export default DetailTag;

const Tag = styled.button`
  margin: 10px 5px;
  font-family: "Pretendard Variable", serif;
  height: 28px;
  font-size: 12px;
  color: white;
  padding: 5px 10px;
  border-radius: 14px;
  border: none;
  background: ${(props) => props.bg};
  cursor: Default;
`;

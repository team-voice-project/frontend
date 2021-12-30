import React from "react";
import styled from "styled-components";

const DetailTag = (props) => {
  return (
    <div>
      <Tag>{props.tag}</Tag>
    </div>
  );
};

export default DetailTag;

const Tag = styled.button`
  margin: 10px 5px;
  font-size: 12px;
  color: white;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background: black;
  cursor: Default;
`;

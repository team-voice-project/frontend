import React from "react";
import styled from "styled-components";

import { Container, Font } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

const SearchKeyword = (props) => {
  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    props.history.push({
      pathname: `/Search`,
      state: { value: value },
    });
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Container>
        <FlexTitle>
          <RiArrowLeftSLine
            size="32"
            cursor="pointer"
            onClick={() => {
              props.history.push("/");
            }}
          />
          <Font title fontSize="22px" margin="5px 0px 0px 0px">
            검색
          </Font>
        </FlexTitle>
        <Flex>
          <Multiline
            ref={inputRef}
            onKeyPress={onKeyPress}
            placeholder="검색어를 입력해주세요."
            type="text"
          ></Multiline>
          <HiOutlineSearch
            size="30"
            cursor="pointer"
            onClick={onClick}
          ></HiOutlineSearch>
        </Flex>
      </Container>
    </div>
  );
};

const FlexTitle = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  width: 150px;
  height: 25px;
  margin: 18px 0px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Multiline = styled.input`
  border: none;
  background: none;
  border-bottom: solid 3px #ddd;
  padding: 12px 4px;
  width: 100%;
  color: #fff;

  :focus {
    border: none;
    background: none;
    border-bottom: solid 3px var(--point-color);
  }
`;

export default SearchKeyword;

import React, { useEffect } from "react";
import styled from "styled-components";

import { Container, Font } from "../../elements/index";
import { HiOutlineSearch } from "react-icons/hi";

const SearchKeyword = (props) => {
  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    } else {
      props.history.push({
        pathname: `/search`,
        state: { value: value },
      });
    }
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
          <Font title fontSize="18px" margin="5px 0px 0px 0px">
            검색
          </Font>
        </FlexTitle>
        <Flex>
          <Multiline
            ref={inputRef}
            onKeyPress={onKeyPress}
            placeholder="검색어를 두글자 이상 입력해주세요."
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

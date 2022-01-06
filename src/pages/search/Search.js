import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Header from "../../components/category/Header";
import { Container } from "../../elements/index";
import Track from "../../components/mypage/Track";
import { actionCreators as searchActions } from "../../redux/modules/search";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Search = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state.value;
  const search_list = useSelector((state) => state.search.searchList);
  const trackWrapRef = useRef(null);

  useEffect(() => {
    dispatch(searchActions.getSearchDB(keyword));
  }, []);

  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    } else {
      dispatch(searchActions.getSearchDB(value));
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

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
      {/* 검색결과 나올때 */}
      {search_list && search_list.length > 0 ? (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/");
                }}
              >
                <RiArrowLeftSLine size="30" cursor="pointer"></RiArrowLeftSLine>
              </Flex>

              <Multiline
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="검색어를 입력해주세요."
                type="text"
                defaultValue={keyword}
              ></Multiline>
              <HiOutlineSearch
                size="30"
                cursor="pointer"
                onClick={onClick}
              ></HiOutlineSearch>
            </Flex>

            <TrackGrid ref={trackWrapRef}>
              {search_list &&
                search_list.map((l) => {
                  return (
                    <TrackDiv key={l.trackId}>
                      <Track {...l} trackWrapRef={trackWrapRef.current} />
                    </TrackDiv>
                  );
                })}
            </TrackGrid>
          </Container>
        </>
      ) : (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/");
                }}
              >
                <RiArrowLeftSLine size="30" cursor="pointer"></RiArrowLeftSLine>
              </Flex>
              <Multiline
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="검색어를 두글자 이상 입력해주세요."
                type="text"
                defaultValue={keyword}
              ></Multiline>
              <HiOutlineSearch
                size="30"
                cursor="pointer"
                onClick={onClick}
              ></HiOutlineSearch>
            </Flex>
            <OAODiv>
              <OAOText>검색결과가 없습니다</OAOText>
              <OAOText>다시 한번 검색해주세요!</OAOText>
              <OAO></OAO>
            </OAODiv>
          </Container>
        </>
      )}
    </div>
  );
};

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

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TrackDiv = styled.div`
  margin: 0px 7px;
`;

const OAODiv = styled.div`
  position: relative;
  top: 150px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 156px;
  height: 156px;
  margin: 40px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default Search;

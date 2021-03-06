import React from "react";
import styled from "styled-components";
import { actionCreators as searchActions } from "../../redux/modules/search";
import { useEffect, useRef } from "react";
import Track from "../../components/mypage/Track";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "../../components/mypage/Skeleton";
import Header from "../../components/category/Header";
import { Container, Spinner } from "../../elements/index";

import { useDispatch, useSelector } from "react-redux";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

const KeywordSearch = (props) => {
  const dispatch = useDispatch();
  const trackWrapRef = useRef(null);
  const location = useLocation();
  const keyword = location.state.value;
  const search_list = useSelector((state) => state.search.list);
  const searchLoading = useSelector((state) => state.search.is_loading);
  const search_page = useSelector((state) => state.search.page);
  const has_more = useSelector((state) => state.search.has_more);

  useEffect(() => {
    fetchData();
  }, []);

  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    }
    if (value.length > 1 && keyword !== value) {
      dispatch(searchActions.resetdata());
      dispatch(searchActions.getSearchDB(value, search_page));

      props.history.push({
        pathname: `/search`,
        state: { value: value },
      });
    }
  };

  const fetchData = () => {
    dispatch(searchActions.getSearchDB(keyword, search_page));
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
    <div ref={trackWrapRef}>
      {searchLoading === false ? (
        <Wrap
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: "0 auto",
            marginTop: "60px",
            maxWidth: "425px",
          }}
        >
          {new Array(10).fill(1).map((_, i) => {
            return <Skeleton key={i} />;
          })}
        </Wrap>
      ) : search_list && search_list.length > 0 ? (
        <>
          <HeaderDiv>
            <Header topMenu />
          </HeaderDiv>
          <Wrap>
            <Container>
              <FlexDiv>
                <Flex
                  onClick={() => {
                    props.history.push("/searchKeyword");
                    dispatch(searchActions.resetdata());
                  }}
                >
                  <RiArrowLeftSLine
                    size="30"
                    cursor="pointer"
                  ></RiArrowLeftSLine>
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
              </FlexDiv>
            </Container>
            <Grid>
              <InfiniteScroll
                dataLength={search_list.length}
                next={fetchData}
                hasMore={has_more}
                loader={<Spinner />}
              >
                <TrackGrid>
                  {search_list.map((l) => {
                    return (
                      <TrackDiv key={l.trackId}>
                        <Track {...l} trackWrapRef={trackWrapRef.current} />
                      </TrackDiv>
                    );
                  })}
                </TrackGrid>
              </InfiniteScroll>
            </Grid>
          </Wrap>
        </>
      ) : (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/searchKeyword");
                  dispatch(searchActions.resetdata());
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

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #000;
  z-index: 4;
`;

const Wrap = styled.div`
  margin-top: 60px;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  max-width: 425px;
  width: 100%;
  padding-right: 50px;
  background-color: #000;
  position: fixed;
  top: 60px;
  z-index: 4;
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

const Grid = styled.div`
  padding-left: 10px;
  margin-top: 110px;
  margin-left: 5px;
  /* @media screen and (max-width: 375px) {
    padding-left: 0px;
  } */
`;

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TrackDiv = styled.div`
  margin: 0px 10px;
  @media screen and (max-width: 422px) {
    margin: 0 13px;
  }
  @media screen and (max-width: 400px) {
    margin: 0 11px;
  }
  @media screen and (max-width: 375px) {
    margin: 0 8px;
  }
  @media screen and (max-width: 366px) {
    margin: 0 7px;
  }
  @media screen and (max-width: 351px) {
    margin: 0 6px;
  }
  @media screen and (max-width: 345px) {
    margin: 0 5px;
  }
  @media screen and (max-width: 339px) {
    margin: 0 4px;
  }
  @media screen and (max-width: 333px) {
    margin: 0px 0px 0px 3px;
  }
`;

const OAODiv = styled.div`
  position: relative;
  margin-top: 120px;
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
export default KeywordSearch;

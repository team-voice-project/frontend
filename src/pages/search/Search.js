import React from "react";
import styled from "styled-components";
import { actionCreators as searchActions } from "../../redux/modules/search";
import { useEffect, useState, useRef } from "react";
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

  console.log("search_list", search_list);
  console.log("search_page", search_page);

  const [page, setPage] = useState(search_page);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    dispatch(searchActions.getSearchDB(keyword, page));
  }, [page]);

  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    }
    if (value.length > 1 && keyword !== value) {
      dispatch(searchActions.resetdata(page));
      dispatch(searchActions.getSearchDB(value, search_page));
      setSearchWord(value);
      props.history.push({
        pathname: `/search`,
        state: { value: value },
      });
    }
  };

  const mounted = React.useRef(false);

  useEffect(() => {
    const dispatchValue = () => {
      const value = inputRef.current?.value;
      return value;
    };
    const searchValue = dispatchValue();
    if (!mounted.current) {
      mounted.current = true;
    }
    if (keyword !== searchValue) {
      dispatch(searchActions.getSearchDB(searchValue, search_page));
    }
  }, [page]);

  const fetchData = () => {
    let pages = page + 1;
    setPage(pages);
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
                    dispatch(searchActions.resetdata(page));
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
                <TrackGrid ref={trackWrapRef}>
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
                  dispatch(searchActions.resetdata(page));
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
  z-index: 1000;
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
  z-index: 8888;
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
  @media screen and (max-width: 375px) {
    margin: 0 5px;
  }
  @media screen and (max-width: 320px) {
    margin: 0 1px;
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

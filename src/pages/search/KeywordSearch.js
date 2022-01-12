import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useRef } from "react";
import Track from "../../components/mypage/Track";
import { useLocation } from "react-router-dom";
import { apis } from "../../shared/api";
import Header from "../../components/category/Header";
import { Container } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

const KeywordSearch = (props) => {
  const trackWrapRef = useRef(null);
  const location = useLocation();
  const keyword = location.state.value;

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    //데이터 가져오기
    const getsearchList = async (keyword, pages, track) => {
      const res = await apis.search(
        (keyword = location.state.value),
        (pages = 1),
        (track = 12)
      );

      const data = await res.data.tracks; //리스폰스를 const data에 저장
      setItems(data); //items는 현재 빈배열. 여기에 처음 12개 데이터를 set해주기
    };
    getsearchList();
  }, []);

  const fetchSearch = async (keyword, pages, track) => {
    console.log("page", page);
    const res = await apis.search(
      (keyword = location.state.value),
      (pages = `${page}`),
      (track = 12)
    );

    const data = await res.data.tracks;
    return data;
  };

  const fetchData = async () => {
    const searchFormServer = await fetchSearch();
    setItems([...items, ...searchFormServer]);

    if (searchFormServer.length === 0 || searchFormServer.length < 12) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  console.log("items", items);

  const inputRef = React.useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (value.length < 2) {
      window.alert("검색어를 두 글자 이상 입력해주세요OAO!");
    }
    // else {
    //   dispatch(searchActions.getSearchDB(value));
    // }
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
      {items && items.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Header topMenu />
            <Container>
              <Flex>
                <Flex
                  onClick={() => {
                    props.history.push("/searchKeyword");
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
              </Flex>
            </Container>
            <Grid>
              <TrackGrid ref={trackWrapRef}>
                {items.map((l) => {
                  return (
                    <TrackDiv key={l.trackId}>
                      <Track {...l} trackWrapRef={trackWrapRef.current} />
                    </TrackDiv>
                  );
                })}
              </TrackGrid>
            </Grid>
          </InfiniteScroll>
        </>
      ) : (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Flex
                onClick={() => {
                  props.history.push("/searchKeyword");
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

const Grid = styled.div`
  padding-left: 10px;
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

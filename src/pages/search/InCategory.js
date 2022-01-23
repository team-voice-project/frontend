import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { actionCreators as postActions } from "../../redux/modules/post";
import Skeleton from "../../components/mypage/Skeleton";
import { actionCreators as searchActions } from "../../redux/modules/search";
import { apis } from "../../shared/api";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Font, FloatingBtn, Spinner } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";

const InCategory = (props) => {
  const dispatch = useDispatch();
  const name = props.match.params.categoryName;

  const tag_list = useSelector((state) => state.post.tag_list);
  const category = useSelector((state) => state.search.list);
  const searchLoading = useSelector((state) => state.search.is_loading);
  const category_page = useSelector((state) => state.search.page);
  const has_more = useSelector((state) => state.search.has_more);
  const trackWrapRef = useRef(null);

  const [show_modal, setShowModal] = useState(false);
  const [page, setPage] = useState(category_page);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(postActions.loadImageDB());
    dispatch(searchActions.resetdata());
  }, []);

  useEffect(() => {
    const tag1 = "";
    const tag2 = "";
    const tag3 = "";
    dispatch(searchActions.loadCategoryDB(name, tag1, tag2, tag3, page));
  }, [name, page]);

  const fetchData = () => {
    let pages = page + 1;

    setPage(pages);
  };

  return (
    <>
      <HeaderDiv>
        <Header topMenu />
      </HeaderDiv>

      {show_modal && (
        <CategoryModal
          tagList={tag_list}
          name={name}
          setShowModal={setShowModal}
        />
      )}

      <Wrap ref={trackWrapRef}>
        <Flex style={{ justifyContent: "space-between" }}>
          <FlexTitle>
            <RiArrowLeftSLine
              cursor="pointer"
              size="32"
              onClick={() => {
                props.history.goBack();
                dispatch(searchActions.resetdata(page));
              }}
            />
            <Font title fontSize="18px" margin="5px 0px 0px 0px">
              {name}
            </Font>
          </FlexTitle>
          <div>
            {category && category.length > 0 ? (
              <BsFilterRight cursor="pointer" size="32" onClick={openModal} />
            ) : (
              ""
            )}
          </div>
        </Flex>
        {searchLoading === false ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "60px",
            }}
          >
            {new Array(10).fill(1).map((_, i) => {
              return <Skeleton key={i} />;
            })}
          </div>
        ) : category && category.length > 0 ? (
          <InfiniteScroll
            dataLength={category.length}
            next={fetchData}
            hasMore={has_more}
            loader={has_more === false ? "" : <Spinner />}
          >
            <TrackGrid>
              {category &&
                category.map((l, i) => {
                  return (
                    <TrackDiv key={l.trackId}>
                      <Track {...l} trackWrapRef={trackWrapRef.current} />
                    </TrackDiv>
                  );
                })}
            </TrackGrid>
          </InfiniteScroll>
        ) : (
          <OAODiv>
            <OAOText>해당 카테고리의 게시물이 없습니다</OAOText>
            <OAOText>다른 카테고리를 선택해보세요!</OAOText>
            <OAO></OAO>
          </OAODiv>
        )}
      </Wrap>
      <FloatingBtn></FloatingBtn>
    </>
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
  width: 100%;
  max-width: 425px;
  margin: auto;
  padding: 10px;
`;

const FlexTitle = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  width: 150px;
  height: 25px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px 30px 0px 0px;
  max-width: 425px;
  width: 100%;
  background-color: #000;
  position: fixed;
  top: 60px;
  z-index: 4;
`;

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 80px;
`;

const TrackDiv = styled.div`
  max-width: 120px;
  margin: 0px 10px;
  @media screen and (max-width: 422px) {
    margin: 0 5px;
    flex: 1;
  }
  @media screen and (max-width: 344px) {
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
export default InCategory;

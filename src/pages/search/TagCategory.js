import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { actionCreators as searchActions } from "../../redux/modules/search";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Font, FloatingBtn, Spinner } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const TagCategory = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const tags = location.state.tag;
  const tag1 = tags[0];
  const tag2 = tags[1];
  const tag3 = tags[2];
  const name = location.state.category;
  const [show_modal, setShowModal] = useState(false);
  // const [tag, setTag] = useState([]);
  const trackWrapRef = useRef(null);

  const category = useSelector((state) => state.search.list);
  const category_page = useSelector((state) => state.search.page);
  const has_more = useSelector((state) => state.search.has_more);
  const reducerTags = useSelector((state) => state.search.tags);

  // console.log("리듀서에서 히스토리로 넘긴 데이터", location);
  // console.log("useSelector로 가져온 태그정보", reducerTags);
  // console.log("====category_page====", category_page);
  // console.log("tag태그들:::::::))", tags);

  useEffect(() => {
    // console.log(
    //   "===============================페이지가 1로 초기화 됩니다==================================="
    // );

    dispatch(searchActions.resetdata());
  }, [tag1, tag2, tag3]);

  useEffect(() => {
    fetchData();
  }, [tag1, tag2, tag3]);

  // useEffect(() => {
  //   if (!tag1) {
  //     props.history.push(`/category/${name}`);
  //     // window.location.reload();
  //   }
  // }, [tags]);

  // console.log("====category_page====", category_page);
  const fetchData = () => {
    // console.log("인피니티 스크롤 -> fetch data의 페이지 상태", category_page);
    dispatch(
      searchActions.loadCategoryDB(name, tag1, tag2, tag3, category_page)
    );
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleClick = (idx) => {
    const filteredTags = tags.filter((l, i) => idx !== i);
    const padArray = Array.from({ length: 3 }, (v, i) =>
      filteredTags[i] ? filteredTags[i] : ""
    );

    // dispatch(searchActions.resetdata());
    dispatch(searchActions.loadTagDB(name, ...padArray, 0));

    // console.log("필터 후 3개로 채워준 결과값", padArray);
    // setTag(a);
  };

  // // console.log(":::::::::::::::tag::::::::::::", tag);
  // const handleTagArray = () => {
  //   const emptyTag = "";

  //   if (tag.length === 2) {
  //     return tag.push(emptyTag);
  //   }
  //   if (tag.length === 1) {
  //     return tag.push(emptyTag, emptyTag);
  //   }
  //   if (tag.length === 0) {
  //     return tag.push(emptyTag, emptyTag, emptyTag);
  //   }
  // };

  // const mounted = React.useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     handleTagArray();
  //     console.log("삭제 후 태그배열=>", tag);
  //     dispatch(searchActions.loadTagDB(name, ...tag, category_page));
  //     // dispatch(searchActions.resetdata());
  //   }
  // }, [tag]);

  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     if (!tag1) {
  //       console.log("태그가 다 사라지면 리셋을 해줘");
  //       dispatch(searchActions.resetdata());
  //     }
  //   }
  // }, [tag1]);
  return (
    <>
      <HeaderDiv>
        <Header topMenu />
      </HeaderDiv>

      {show_modal && (
        <CategoryModal
          name={name}
          setShowModal={setShowModal}
          selectedTag={tags}
        />
      )}

      <Wrap>
        <Flex style={{ justifyContent: "space-between" }}>
          <FlexTitle>
            <RiArrowLeftSLine
              cursor="pointer"
              size="32"
              onClick={() => {
                props.history.goBack();
                dispatch(searchActions.resetdata());
              }}
            />
            <Font title fontSize="18px" margin="5px 0px 0px 0px">
              {name}
            </Font>
          </FlexTitle>
          <div>
            <BsFilterRight
              cursor="pointer"
              size="32"
              onClick={() => {
                openModal();
              }}
            />
          </div>
        </Flex>
        <TagDiv>
          {tags &&
            tags.map((l, idx) => {
              if (l !== "") {
                return (
                  <TagGrid key={idx}>
                    <Tag
                      onClick={() => {
                        handleClick(idx);
                      }}
                    >
                      {l}
                      <IoCloseSharp />
                    </Tag>
                  </TagGrid>
                );
              }
            })}
        </TagDiv>

        {category && category.length > 0 ? (
          <CategoryWrap>
            <InfiniteScroll
              dataLength={category.length}
              next={fetchData}
              hasMore={has_more}
              loader={<Spinner />}
            >
              <TrackGrid ref={trackWrapRef}>
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
          </CategoryWrap>
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

const CategoryWrap = styled.div`
  /* margin-top: 30px; */
`;

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #000;
  z-index: 4;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
  font-size: 14px;
  border: 0;
  padding: 10px 15px 11px 15px;
  color: #fff;
  background-color: var(--point-color);
  margin: 5px;
  margin-bottom: 16px;
  border-radius: 20px;
  @media screen and (max-width: 320px) {
    padding: 8px;
  }

  svg {
    position: relative;
    top: 1px;
    right: -3px;
    margin-left: 3px;
  }
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

const TagDiv = styled.div`
  align-items: center;
  vertical-align: center;
  max-width: 425px;
  width: 100%;
  background-color: #000;
  margin-top: 90px;
`;

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
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

const TagGrid = styled.div`
  cursor: pointer;
  margin: 10px 4px 0px 0px;
  display: inline-block;
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
export default TagCategory;

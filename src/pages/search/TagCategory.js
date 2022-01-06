import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { actionCreators as searchActions } from "../../redux/modules/search";
import { actionCreators as postActions } from "../../redux/modules/post";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Font } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const TagCategory = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const tags = location.state.tag;
  const name = location.state.category;

  const tag_list = useSelector((state) => state.post.tag_list);
  const category = useSelector((state) => state.search.category_list);
  //undefined일때 화면관리하기

  useEffect(() => {
    dispatch(searchActions.loadTagDB(name, ...tags));
  }, []);

  const [show_modal, setShowModal] = React.useState(false);
  const [tag, setTag] = React.useState([]);
  const trackWrapRef = useRef(null);
  console.log("트랙 Wrapper", trackWrapRef);

  const openModal = () => {
    setShowModal(true);
  };

  const handleClick = (idx) => {
    const a = tags.filter((l, i) => idx !== i);
    setTag(a);
  };

  const mounted = React.useRef(false);

  //업데이트 될 때만 실행
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(searchActions.loadTagDB(name, ...tag));
    }
  }, [tag]);

  return (
    <>
      <Header topMenu />
      {show_modal && (
        <CategoryModal
          tagList={tag_list}
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
                props.history.push(`/category`);
              }}
            />
            <Font title fontSize="22px" margin="5px 0px 0px 0px">
              {name}
            </Font>
          </FlexTitle>
          <div>
            <BsFilterRight cursor="pointer" size="32" onClick={openModal} />
          </div>
        </Flex>

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

        {category && category.length > 0 ? (
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
        ) : (
          <OAODiv>
            <OAOText>해당 카테고리의 게시물이 없습니다</OAOText>
            <OAOText>다른 카테고리를 선택해보세요!</OAOText>
            <OAO></OAO>
          </OAODiv>
        )}
      </Wrap>
    </>
  );
};

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
  padding: 0px 10px;
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
`;

const TagGrid = styled.div`
  cursor: pointer;
  margin: 10px 4px 0px 0px;
  display: inline-block;
`;

const OAODiv = styled.div`
  position: relative;
  top: 160px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 200px;
  height: 210px;
  margin: 55px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default TagCategory;

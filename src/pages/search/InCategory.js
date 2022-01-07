import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as searchActions } from "../../redux/modules/search";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Font } from "../../elements/index";

import { RiArrowLeftSLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";

const InCategory = (props) => {
  const dispatch = useDispatch();
  const name = props.match.params.categoryName;

  const tag_list = useSelector((state) => state.post.tag_list);
  const category = useSelector((state) => state.search.category_list);
  const trackWrapRef = useRef(null);

  const [show_modal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  React.useEffect(() => {
    dispatch(postActions.loadImageDB());
    dispatch(searchActions.loadCategoryDB(name));
  }, []);

  return (
    <>
      <Header topMenu />
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
              }}
            />
            <Font title fontSize="22px" margin="5px 0px 0px 0px">
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

        {category && category.length > 0 ? (
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

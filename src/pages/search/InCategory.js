import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as searchActions } from "../../redux/modules/search";
import CategoryModal from "../../components/category/CategoryModal";
import Header from "../../components/category/Header";
import Track from "../../components/mypage/Track";
import { Font } from "../../elements/index";
import Tag from "../../elements/Tag";

import { RiArrowRightSLine, RiLineHeight } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";

const InCategory = (props) => {
  const dispatch = useDispatch();
  const name = props.match.params.categoryName;

  const tag_list = useSelector((state) => state.post.tag_list);
  const category = useSelector((state) => state.search.category_list);
  console.log("카테고리", category);

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
      {/* <Header topMenu /> */}
      {show_modal && (
        <CategoryModal
          tagList={tag_list}
          name={name}
          setShowModal={setShowModal}
        />
      )}

      <Wrap>
        <Flex style={{ justifyContent: "space-between" }}>
          <Flex>
            <RiArrowLeftSLine
              cursor="pointer"
              size="32"
              onClick={() => {
                props.history.push("/category");
              }}
            />
            <Font title fontSize="22px" margin="18px 0px">
              {name}
            </Font>
          </Flex>
          <div>
            <BsFilterRight cursor="pointer" size="32" onClick={openModal} />
          </div>
        </Flex>
        {category.map((list) => {
          console.log("태그", list);
          return (
            <React.Fragment key={list.trackId}>
              {list.TrackTags.map((l, i) => {
                console.log("태태태태탵그", l);
                return (
                  <TagGrid key={i}>
                    <Tag removable={"true"}>{l.tag}</Tag>
                  </TagGrid>
                );
              })}
            </React.Fragment>
          );
        })}

        <TrackGrid>
          <TrackDiv>
            <Track />
          </TrackDiv>
        </TrackGrid>
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
  margin: 10px 4px 0px 0px;
  display: inline-block;
`;

// const Circle = styled.div`
//   width: 115px;
//   height: 115px;
//   background-color: #acabab;
//   /* border: 5px solid #fce300; */
//   border-radius: 120px;
//   margin: 20px 10px 15px 10px;
// `;

// const Grid = styled.div`
//   padding: 0px 10px;
// `;

// const Title = styled.div`
//   font-size: 15px;
// `;

// const Name = styled.div`
//   font-size: 12px;
//   margin: 4px 0px;
// `;

// const Count = styled.div`
//   display: flex;
// `;

// const Icon = styled.div`
//   width: 18px;
//   height: 18px;
//   background-color: #ddd;
//   margin: 4px 6px 0px 0px;
// `;

// const CountText = styled.div`
//   font-size: 12px;
//   margin: 4px 12px 0px 0px;
// `;

export default InCategory;

import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/category/Header";
import Font from "../../elements/Font";
import { actionCreators as postActions } from "../../redux/modules/post";

import { RiArrowLeftSLine } from "react-icons/ri";

const Category = (props) => {
  const dispatch = useDispatch();

  const category_list = useSelector((state) => state.post.Image_list);

  React.useEffect(() => {
    dispatch(postActions.loadImageDB());
  }, []);

  return (
    <div>
      <Header noHeader />
      <Wrap>
        <div style={{ marginBottom: "40px", padding: "0px 20px" }}>
          <Flex>
            <RiArrowLeftSLine
              cursor="pointer"
              size="28"
              onClick={() => {
                props.history.push("/");
              }}
            />
            <Font title fontSize="22px" margin="5px 0px 0px 0px">
              카테고리
            </Font>
          </Flex>

          <Desc>카테고리에서 태그 조정을 통해 원하는 목소리를 찾아보세요</Desc>
        </div>

        <BoxWrap>
          {category_list &&
            category_list.map((l, idx) => {
              const categoryName = l.category;
              return (
                <Box key={idx}>
                  <Rectangle
                    src={l.categoryUrl}
                    onClick={() => {
                      props.history.push(`/category/${categoryName}`);
                    }}
                  ></Rectangle>
                </Box>
              );
            })}
        </BoxWrap>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  text-align: center;
  flex-wrap: wrap;
`;

const BoxWrap = styled.div`
  padding: 0px 10px;
  margin: 0px 4px;
`;

const Desc = styled.div`
  color: #ddd;
  font-size: 13px;
`;

const Box = styled.div`
  /* flex-wrap: wrap; */

  /* margin: 0px 6px 10px 6px; */
`;

const Rectangle = styled.img`
  cursor: pointer;
  width: 115px;
  height: 112px;

  border-radius: 10px;
  margin: 0px 6px 10px 6px;

  @media screen and (max-width: 409px) {
    width: 98px;
    height: 97px;
  }

  @media screen and (max-width: 320px) {
    width: 82px;
    height: 80px;
  }
  @media screen and (max-width: 316px) {
    width: 80px;
    height: 78px;
  }
  @media screen and (max-width: 290px) {
    width: 72px;
    height: 70px;
    border-radius: 8px;
    margin: 0px 4px 10px 4px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  width: 150px;
  height: 25px;
  margin-bottom: 18px;
`;

export default Category;

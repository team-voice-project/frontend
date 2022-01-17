import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/category/Header";
import Font from "../../elements/Font";
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as searchActions } from "../../redux/modules/search";

const Category = (props) => {
  const dispatch = useDispatch();

  const category_list = useSelector((state) => state.post.Image_list);

  React.useEffect(() => {
    dispatch(postActions.loadImageDB());
    dispatch(searchActions.resetdata());
  }, []);

  return (
    <div>
      <Header noHeader />
      <Wrap>
        <div style={{ marginBottom: "40px", padding: "0px 20px" }}>
          <Flex>
            <Font title fontSize="18px" margin="5px 0px 0px 0px">
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
                  <div className="img-box">
                    <Rectangle
                      src={l.categoryUrl}
                      onClick={() => {
                        props.history.push(`/category/${categoryName}`);
                      }}
                    ></Rectangle>
                  </div>
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
  margin: 0 auto;
`;

const Desc = styled.div`
  color: #ddd;
  font-size: 13px;
`;

const BoxWrap = styled.div`
  padding: 0px 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
`;

const Box = styled.div`
  width: calc(33.33% - 10px);
  margin: 5px;

  .img-box {
    padding-bottom: 100%;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const Rectangle = styled.img`
  cursor: pointer;
  border-radius: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

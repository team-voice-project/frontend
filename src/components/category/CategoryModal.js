import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as searchActions } from "../../redux/modules/search";

import { Button, Container } from "../../elements";
import Tag from "../../elements/Tag";

const CategoryModal = ({ setShowModal, tagList, name }) => {
  const dispatch = useDispatch();

  const category = name;
  //새 배열로 만들기
  const [tag_list, setTagList] = React.useState([]); //태그리스트 클릭 시 바뀐 상태값 업데이트

  const [is_disabled, setIsDisabled] = React.useState(true);

  useEffect(() => {
    const trueActive = tag_list.filter((tag, idx) => {
      return tag.active === true;
    });

    if (trueActive.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [tag_list]);

  //한번만 렌더링해서 배열 변경 해줘야함 => useEffect사용
  //{tag:"젠틀함"}=>{tag:젠틀함, active:false}
  useEffect(() => {
    const newList = tagList.map((list, idx) => {
      //map()=>새로운 배열을 리턴(배열패턴에 주의하자)//
      const obj = {
        tag: list.tag,
        active: false,
      };
      return obj;
    });

    setTagList(newList); //tag_list를 새로운 배열로 만들어준다.(active:false를 포함한 배열)
  }, []);

  //누른 tag의 active를 현재 상태의 반대로 만들어줘야함.(토글기능->true면 false, false면 true)
  const handleClickTag = (idx) => {
    //온클릭 하면 실행되는 함수

    //클릭할 때 선택한 태그가 true가 아니면서 액티브길이가 2이상일때

    const trueActive = tag_list.filter((tag, idx) => {
      //조건을 만족하는 것들만 가져오기
      return tag.active === true;
    });
    if (!tag_list[idx].active && trueActive.length > 2) {
      return window.alert("이미 3가지를 선택하셨어요.");
    }

    tag_list[idx].active = !tag_list[idx].active;
    setTagList([...tag_list]);
  };

  const click = () => {
    const trueActive = tag_list.filter((tag, idx) => {
      return tag.active === true;
    });

    const trueActiveList = [trueActive];
    const tags = trueActiveList[0].map((list, idx) => {
      return list.tag;
    });
    dispatch(searchActions.loadCategoryDB(category, ...tags));
    setShowModal(false);
  };

  return (
    <>
      <BackGround>
        <Wrap>
          <Modal>
            <TagDiv>
              {tag_list.map((l, idx) => {
                //props는 값이 바뀌지 않기 때문에 tag_list를 map
                return (
                  <div key={idx} style={{ display: "inline-block" }}>
                    {/* onClick={함수()}라고 써주면 함수가 클릭 전에 바로 실행. 인자값을 넣어주고 싶으면 onClick={()=>{함수()}} 이렇게 써야한다.*/}
                    <TagBtn
                      className={l.active === true ? "on" : ""}
                      onClick={() => handleClickTag(idx)}
                    >
                      {l?.tag}
                    </TagBtn>
                  </div>
                );
              })}
            </TagDiv>
          </Modal>

          <ButtonDiv>
            <Ment>태그 3개를 선택하여 원하는 목소리를 찾아보세요</Ment>
            <TagButton>
              <Button bg _disabled={is_disabled} _onClick={click}>
                태그 적용하기
              </Button>
            </TagButton>
          </ButtonDiv>
        </Wrap>
      </BackGround>
    </>
  );
};

const BackGround = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow-y: auto;
`;

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const Modal = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 550px;
  background-color: #2c2b2b;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const TagDiv = styled.div`
  padding: 20px 30px;
  margin-top: 20px;
`;

const TagBtn = styled.button`
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
  font-size: 12px;
  border: 0;
  padding: 10px 15px 11px 15px;
  color: #fff;
  background-color: #000;
  margin: 5px;
  margin-bottom: 16px;
  border-radius: 20px;

  &.on {
    background-color: var(--point-color);
  }
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  height: 140px;
  padding: 0px 30px;
`;

const Ment = styled.div`
  font-size: 13px;
  text-align: center;
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const TagButton = styled.div`
  position: relative;
  top: 20px;
  max-width: 425px;
  width: 100%;
  margin: 0px auto 30px auto;
  height: 7.5vh;
  background-color: #ff1953;
  border: none;
  z-index: 9999;
  border-radius: 12px;
`;

export default CategoryModal;

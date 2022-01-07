import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as searchActions } from "../../redux/modules/search";

import { Button } from "../../elements";

import { useHistory } from "react-router-dom";

const CategoryModal = ({ selectedTag, setShowModal, name }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selected_tag = selectedTag;
  const _sessionTag = sessionStorage.getItem("tag_list");
  const sessionTag = JSON.parse(_sessionTag);

  const category = name;
  const [tag_list, setTagList] = React.useState([]);
  const [is_disabled, setIsDisabled] = React.useState(true);
  console.log("tag_list:::", tag_list);

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

  useEffect(() => {
    dispatch(searchActions.loadCategoryDB(name));
  }, []);

  useEffect(() => {
    const newList = sessionTag.map((list, idx) => {
      const obj = {
        tag: list.tag,
        active: false,
      };
      return obj;
    });

    setTagList(newList);
  }, []);

  const handleClickTag = (idx) => {
    const trueActive = tag_list.filter((tag, idx) => {
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

    //state를 push로 넘기는 방법
    // dispatch(searchActions.loadTagDB(category, ...tags));
    history.push({
      pathname: `/tagcategory`,
      state: { category: category, tag: tags },
    });
    setShowModal(false);
  };

  console.log("tag_list", tag_list);

  return (
    <>
      <BackGround>
        <Wrap>
          <Modal>
            <TagDiv>
              {tag_list.map((l, idx) => {
                return (
                  <div key={idx} style={{ display: "inline-block" }}>
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
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 580px;
  background-color: #2c2b2b;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const TagDiv = styled.div`
  padding: 0px 20px 20px 20px;
  margin-top: 30px;
`;

const TagBtn = styled.button`
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
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
  padding: 0px 20px;
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

  background-color: #ff1953;
  border: none;
  z-index: 9999;
  border-radius: 12px;
`;

export default CategoryModal;

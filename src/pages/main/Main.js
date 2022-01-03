import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { Text, Button, Font } from "../../elements/index";
import OnBoarding from "../../components/category/Onboarding";
import Header from "../../components/category/Header";
import PlayBox from "../../components/category/PlayBox";
import MusicPlayer from "../../components/jinkePlayer/MusicPlayer";

import { actionCreators as postActions } from "../../redux/modules/post";

import { RiArrowRightSLine } from "react-icons/ri";

const Main = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const track_list = useSelector((state) => state.post.post_list);
  console.log(props);

  const openModal = () => {
    setShowModal(true);
  };

  React.useEffect(() => {
    openModal();
    dispatch(postActions.loadPostDB());
  }, []);

  return (
    <>
      <Header topMenu props={props} />
      {showModal && <OnBoarding setShowModal={setShowModal} />}
      <WrapDiv>
        <Wrap>
          <Button
            bg
            _onClick={() => {
              props.history.push("/edit/base");
            }}
          >
            나도 목소리 올리기
          </Button>
          <DivText>나의 목소리를 올려서 사람들에게 들려주세요!</DivText>
        </Wrap>
        {track_list &&
          track_list.map((list, idx) => {
            return (
              <React.Fragment key={idx}>
                <Wrap>
                  <DivBoldText>
                    <Font title fontSize="22px" margin="18px 0px">
                      {list.category.categoryText}
                    </Font>
                    <IconDiv
                      onClick={() => {
                        props.history.push(
                          `/category/${list.category.category}`
                        );
                      }}
                    >
                      <RiArrowRightSLine size="28" cursor="pointer" />
                    </IconDiv>
                  </DivBoldText>
                </Wrap>

                <Flex>
                  {list.tracks.map((l) => {
                    return (
                      <div key={l.trackId}>
                        <PlayBox {...l} />
                      </div>
                    );
                  })}
                </Flex>
              </React.Fragment>
            );
          })}
      </WrapDiv>
    </>
  );
};

const WrapDiv = styled.div`
  max-width: 425px;
  width: 100%;
  margin: 20px auto 0px auto;
`;

const Wrap = styled.div`
  padding: 0px 20px;
`;

const DivText = styled.div`
  font-size: 12px;
  padding: 15px 0px 10px 0px;
  text-align: center;
`;

const DivBoldText = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconDiv = styled.div`
  width: 28px;
  height: 28px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    //스크롤바 전체
    height: 4px;
    border-radius: 6px;
    background: #000;
  }
  &::-webkit-scrollbar-thumb {
    //스크롤 막대
    background: var(--point-color);
    border-radius: 6px;
  }
`;

export default Main;

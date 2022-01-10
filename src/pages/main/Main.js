import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { Button, Font } from "../../elements/index";
import OnBoarding from "../../components/category/Onboarding";
import Header from "../../components/category/Header";
import PlayBox from "../../components/category/PlayBox";
import FloatingBtn from "../../elements/FloatingBtn";

import { actionCreators as postActions } from "../../redux/modules/post";

import { RiArrowRightSLine } from "react-icons/ri";

const Main = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [all_list, setAllList] = React.useState([]);
  const track_list = useSelector((state) => state.post.post_list);

  useEffect(() => {
    if (track_list) {
      // 각 카테고리의 트랙정보 고유 아이디를 만들기 위한 인덱스 값
      let idx = 0;
      const _list = track_list.map((list) => {
        const new_list = list.tracks.map((l) => {
          const obj = {
            uniq: `track-id-${idx}`,
            CommentCnt: l.CommentCnt,
            Comments: l.Comments,
            Likes: l.Likes,
            TrackTags: l.TrackTags,
            TrackThumbnail: l.TrackThumbnail,
            User: l.User,
            category: l.category,
            createdAt: l.createdAt,
            title: l.title,
            trackId: l.trackId,
            trackUrl: l.trackUrl,
            userId: l.userId,
            active: false,
          };

          // uniq 인덱스 증가
          idx++;

          return obj;
        });
        const categoryObj = {
          category: list.category,
          tracks: new_list,
        };
        return categoryObj;
      });
      setAllList(_list);
    }
  }, [track_list]);

  useEffect(() => {
    dispatch(postActions.loadPostDB());
  }, []);

  //모달 하루동안 열지 않기
  const HAS_VISITED_BEFORE = localStorage.getItem("hasVisitedBefore");

  useEffect(() => {
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }

      if (!HAS_VISITED_BEFORE) {
        setShowModal(true);
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem("hasVisitedBefore", expires);
      } else {
        setShowModal(false);
      }
    };

    window.setTimeout(handleShowModal, 2000);
  }, [HAS_VISITED_BEFORE]);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Header topMenu props={props} />
      {showModal && <OnBoarding onClose={handleClose} />}
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
        {all_list &&
          all_list.map((list, idx) => {
            return (
              <React.Fragment key={idx}>
                <TrackWrap>
                  <Wrap>
                    <DivBoldText>
                      <Font title fontSize="18px" margin="18px 0px">
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
                        <div key={`track-id-${l.uniq}`}>
                          <PlayBox
                            {...l}
                            setAllListData={setAllList}
                            all_list={all_list}
                            target_uniq={l.uniq}
                          />
                        </div>
                      );
                    })}
                  </Flex>
                </TrackWrap>
              </React.Fragment>
            );
          })}
      </WrapDiv>
      <FloatingBtn bubble></FloatingBtn>
    </>
  );
};

const WrapDiv = styled.div`
  max-width: 425px;
  width: 100%;
  margin: 20px auto 0px auto;
`;

const TrackWrap = styled.div`
  margin-bottom: 30px;
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
    overflow: auto;
  }
  &::-webkit-scrollbar-thumb {
    //스크롤 막대
    background: var(--point-color);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #000; /*스크롤바 트랙 색상*/
  }
`;

export default Main;

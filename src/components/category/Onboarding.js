import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Container from "../../elements/Container";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { actionCreators as postActions } from "../../redux/modules/post";

import { HiHeart } from "react-icons/hi";
import { RiChat4Fill } from "react-icons/ri";
import { Button, Font, Tag } from "../../elements";
import { useHistory } from "react-router-dom";

const OnBoarding = ({ setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const track_list = useSelector((state) => state.post.onboarding);
  console.log("여기", track_list);

  const randomData = () => {
    if (track_list) {
      const random = Math.floor(Math.random() * track_list.length);
      return track_list[random];
    }
  };
  console.log("랜덤으로 나와?", randomData());

  React.useEffect(() => {
    dispatch(postActions.loadPostDB());
  }, []);

  return (
    <Background>
      <Header noHeader />
      <Container>
        <BoxDiv>
          <Flex>
            <SmallCircle
              src={
                randomData() &&
                randomData().TrackThumbnail.trackThumbnailUrlFace
              }
            ></SmallCircle>
            <div
              style={{
                width: "80px",
                height: "20px",
              }}
            >
              <Font title margin="2px 0px 0px 8px">
                {randomData() && randomData().User.nickname}
              </Font>
            </div>
          </Flex>
          <ImgDiv>
            <OAOImage
              src={
                randomData() &&
                randomData().TrackThumbnail.trackThumbnailUrlFull
              }
            ></OAOImage>
          </ImgDiv>
          <BoldFont>{randomData() && randomData().title}</BoldFont>
          <FlexTag>
            {randomData() &&
              randomData().TrackTags.map((l, i) => {
                console.log("맵돌려", l);
                return (
                  <div key={i} style={{ display: "inline-block" }}>
                    <TagBox>{l.tag}</TagBox>
                  </div>
                );
              })}
          </FlexTag>

          <SingleAudioPlayer
            audio={randomData() && randomData().trackUrl}
          ></SingleAudioPlayer>

          <FlexCount>
            <CountBox>
              <HiHeart size="20"></HiHeart>
              <CountText>132</CountText>
            </CountBox>
            <CountBox>
              <RiChat4Fill size="18"></RiChat4Fill>
              <CountText>28</CountText>
            </CountBox>
          </FlexCount>
        </BoxDiv>
        <Button
          bg
          margin="0px 0px 15px 0px"
          _onClick={() => {
            history.push("/edit/base");
          }}
        >
          나도 목소리 올리기
        </Button>
        <Button
          border
          margin="0px 0px 25px 0px"
          _onClick={() => {
            setShowModal(false);
          }}
        >
          다른 목소리 듣기
        </Button>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  z-index: 9999;
  overflow-y: auto;
`;

const BoxDiv = styled.div`
  width: 100%;
  height: 480px;
  background-color: #252525;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  margin-right: 16px;
`;

const FlexTag = styled.div`
  width: 100%;
  margin: 4px auto 0px auto;
  text-align: center;
`;

const FlexCount = styled.div`
  display: flex;
  align-items: center;
  vertical-align: right;
  margin: 4px 0px 0px 250px;

  @media screen and (max-width: 380px) {
    margin: 10px 0px 0px 200px;
  }
  @media screen and (max-width: 320px) {
    margin: 10px 0px 0px 150px;
  }
`;

const SmallCircle = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  background-color: #616161;
`;

const Name = styled.div`
  font-size: 16px;
  margin-left: 12px;
`;

const ImgDiv = styled.div`
  width: 160px;
  height: 160px;
  margin: 48px auto 25px auto;
`;

const OAOImage = styled.img`
  width: 160px;
  height: 160px;
`;

const IconDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;
  margin-right: 8px;
`;

const CountText = styled.div`
  font-size: 12px;
  color: #c4c4c4;
  margin-left: 2px;
`;

const BoldFont = styled.div`
  font-size: 18px;
  color: #c4c4c4;
  font-weight: 550;
  text-align: center;
  font-family: "Pretendard Variable", serif;
`;

const TagBox = styled.button`
  width: 75px;
  height: 32px;
  background-color: #000000;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
  align-items: center;
  margin: 4px 10px 8px 0px;
  border: none;
  display: inline-block;
`;

export default OnBoarding;

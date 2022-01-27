import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Container from "../../elements/Container";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { actionCreators as postActions } from "../../redux/modules/post";

import { Button, Font } from "../../elements";
import { useHistory } from "react-router-dom";

const OnBoarding = ({ onClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [random_data, setRandomData] = useState({});

  useEffect(() => {
    dispatch(postActions.loadPostDB());
    random();
  }, []);

  const track_list = useSelector((state) => state.post.onboarding);

  const random = () => {
    if (track_list) {
      const random = Math.floor(Math.random() * track_list.length);
      setRandomData(track_list[random]);
    }
  };

  return (
    <Background>
      <Header noHeader />
      <Container>
        <BoxDiv>
          <Flex>
            <SmallCircle src={random_data?.User?.profileImage}></SmallCircle>
            <div
              style={{
                width: "280px",
                height: "20px",
              }}
            >
              <Font title fontSizd="14px" margin="2px 0px 0px 8px">
                {random_data?.User?.nickname}
              </Font>
            </div>
          </Flex>
          <ImgDiv>
            <OAOImage
              src={random_data?.TrackThumbnail?.trackThumbnailUrlFull}
            ></OAOImage>
          </ImgDiv>

          <FlexTag>
            {random_data?.TrackTags?.map((l, i) => {
              return (
                <div key={i} style={{ display: "inline-block" }}>
                  <TagBox>{l.tag}</TagBox>
                </div>
              );
            })}
          </FlexTag>

          <BoldFont>{random_data?.title}</BoldFont>

          <SingleAudioPlayer audio={random_data?.trackUrl}></SingleAudioPlayer>
        </BoxDiv>
        <Button
          bg
          margin="0px 0px 15px 0px"
          _onClick={() => {
            history.push("/edit/base");
            onClose();
          }}
        >
          나도 목소리 올리기
        </Button>
        <Button border margin="0px 0px 25px 0px" _onClick={onClose}>
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
  height: 68vh;
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

const FlexTag = styled.div`
  width: 100%;
  margin: 4px auto 0px auto;
  text-align: center;
`;

const SmallCircle = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  background-color: #616161;
`;

const ImgDiv = styled.div`
  width: 140px;
  height: 140px;
  margin: 48px auto 25px auto;
`;

const OAOImage = styled.img`
  width: 140px;
  height: 140px;
`;

const BoldFont = styled.div`
  font-size: 18px;
  color: #c4c4c4;
  font-weight: 550;
  text-align: center;
  font-family: "Pretendard Variable", serif;
  margin-bottom: 16px;
`;

const TagBox = styled.button`
  margin: 10px 5px;
  font-family: "Pretendard Variable", serif;
  height: 28px;
  font-size: 12px;
  color: white;
  padding: 5px 10px;
  border-radius: 14px;
  border: none;
  background-color: #000;
  cursor: Default;
`;

export default OnBoarding;

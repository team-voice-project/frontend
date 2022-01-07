import React, { useState } from "react";
import styled from "styled-components";

import MenuModal from "./MenuModal";
import PlayButton from "./playButton.png";
import PauseBtn from "./pauseBtn.png";
import { HiHeart } from "react-icons/hi";

import { RiChat4Fill } from "react-icons/ri";
import { actionCreators as playerActions } from "../../redux/modules/globalPlayer";
import { useDispatch, useSelector } from "react-redux";

const Track = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const globalPlayer = useSelector(
    (state) => state.globalPlayer.playerInstance
  );

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "scroll";
  };

  const handleChangeActiveTrack = async (e) => {
    if (e.target.tagName === "INPUT") {
      // img, input 태그 중첩 클릭 방지
      const currentInput = e.currentTarget.querySelector(".radioButton");
      const wrapper = props.trackWrapRef;
      const inputs = wrapper.querySelectorAll(".radioButton");
      const checkedLength = wrapper.querySelectorAll(
        ".radioButton:checked"
      ).length;

      if (checkedLength >= 1) {
        inputs.forEach((input) => (input.checked = false));
        currentInput.checked = true;

        const now_track = {
          trackId: props.trackId,
          name: props.title,
          singer: props.User.nickname,
          cover: props.TrackThumbnail.trackThumbnailUrlFace,
          musicSrc: props.trackUrl,
        };

        await dispatch(playerActions.play(now_track));
        globalPlayer.play();
      } else {
        globalPlayer.pause();
      }
    }
  };

  return (
    <>
      <MenuModal props={props} open={modalOpen} close={closeModal} />
      <DivWrap>
        <TrackDiv onClick={handleChangeActiveTrack}>
          <label>
            {/* PlayBtn -> input element */}
            <PlayBtn type="checkbox" className="radioButton"></PlayBtn>
            <DIV>
              <ImageCircle
                className="circle"
                src={props.TrackThumbnail?.trackThumbnailUrlFace}
              />
              <PlayImg className="play"></PlayImg>
            </DIV>
          </label>
        </TrackDiv>
        <div
          onClick={() => {
            openModal();
          }}
          style={{ cursor: "pointer" }}
        >
          <TextDiv>
            <TextSize>
              <div style={{ display: "flex" }}>
                <Title>{props.title}</Title>
              </div>
            </TextSize>
            <Text>{props.User.nickname}</Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: "15px",
                  alignItems: "center",
                }}
              >
                <HiHeart style={{ marginRight: "5px" }} />
                <Text>{props?.Likes?.likeCnt}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiChat4Fill style={{ marginRight: "5px", marginTop: "3px" }} />
                <Text>{props?.Comments?.length}</Text>
              </div>
            </div>
          </TextDiv>
        </div>
      </DivWrap>
    </>
  );
};

const DivWrap = styled.div`
  position: relative;
`;

const TrackDiv = styled.div`
  margin-right: 7px;
  margin-left: 7px;
  @media screen and (max-width: 365px) {
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const PlayImg = styled.div`
  position: absolute;
  bottom: 70px;
  right: 5px;
  background: url(${PlayButton});
  background-color: #f1134e;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  @media screen and (max-width: 380px) {
    position: absolute;
    bottom: 70px;
    right: 15px;
    width: 25px;
    height: 25px;
  }
`;
const DIV = styled.div`
  cursor: pointer;
  .circle {
    border: none;
  }
`;

const ImageCircle = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 30px 0px 0px 0px;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 380px) {
    width: 80px;
    height: 80px;
  }
`;
const PlayBtn = styled.input.attrs({ type: "checkbox" })`
  display: none;
  &:checked + ${DIV} {
    .circle {
      border: 5px solid #f1134e;
      transition: all 300ms ease-in;
    }
    .play {
      position: absolute;
      top: 70px;
      right: 5px;
      background: url(${PauseBtn});
      background-color: #f1134e;
      background-size: 50%;
      background-position: center;
      background-repeat: no-repeat;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      @media screen and (max-width: 380px) {
        position: absolute;
        bottom: 70px;
        right: 15px;
        width: 25px;
        height: 25px;
      }
    }
  }
`;

const TextDiv = styled.div`
  margin-top: 20px;
`;

const TextSize = styled.div`
  width: 98px;
  height: 15px;
  text-align: left;

  }
`;

const Title = styled.div`
  font-size: 14px;
  height: 20px;
  width: 80px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`;

const Text = styled.p`
  margin-top: 6px;
  margin-bottom: 1px;
  font-size: 12px;
  color: white;
  max-width: 96px;
`;
export default Track;

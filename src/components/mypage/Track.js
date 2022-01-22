import React, { useState, useEffect, useRef } from "react";
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
  const playIconRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const now_track = useSelector((state) => state.globalPlayer.now_track);
  const global_player_mode = useSelector((state) => state.globalPlayer.mode);

  useEffect(() => {
    // console.log("현재 플레이 모드", global_player_mode, props);

    if (now_track?.trackId === props.trackId) {
      if (global_player_mode === "stop") {
        playIconRef.current.checked = false;
      } else {
        playIconRef.current.checked = true;
      }
    }
  }, [global_player_mode]);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
    // dispatch(commentActions.setCommentDB(trackId)
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
      const inputs = wrapper?.querySelectorAll(".radioButton");
      const checkedLength = wrapper?.querySelectorAll(
        ".radioButton:checked"
      ).length;

      if (checkedLength >= 1) {
        inputs.forEach((input) => (input.checked = false));
        currentInput.checked = true;

        const now_track = {
          trackId: props.trackId,
          name: props.title,
          singer: props.User.nickname,
          cover: props.TrackThumbnail,
          musicSrc: props.trackUrl,
        };

        await dispatch(playerActions.play(now_track));
      } else {
        await dispatch(playerActions.stop());
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
            <PlayBtn
              type="checkbox"
              className="radioButton"
              ref={playIconRef}
            ></PlayBtn>
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
                <Text>{props?.CommentCnt?.commentCnt}</Text>
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
  max-width: 100px;
  margin: 0 5px;
  @media screen and (max-width: 422px) {
    margin: 0 auto;
  }
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
  right: -11px;
  background: url(${PlayButton});
  background-color: #f1134e;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  @media screen and (max-width: 422px) {
    position: absolute;
    bottom: 71px;
    right: 10px;
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 398px) {
    position: absolute;
    bottom: 71px;
    right: 12px;
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 345px) {
    position: absolute;
    bottom: 69px;
    right: 25px;
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
  @media screen and (max-width: 422px) {
    width: 80px;
    height: 80px;
  }
  @media screen and (max-width: 344px) {
    width: 70px;
    height: 70px;
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
      bottom: 70px;
  right: -11px;
  background: url(${PauseBtn});
  background-color: #f1134e;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  @media screen and (max-width: 422px) {
    position: absolute;
    bottom: 71px;
    right: 10px;
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 398px) {
    position: absolute;
    bottom: 71px;
    right: 12px;
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 345px) {
    position: absolute;
    bottom: 69px;
    right: 25px;
    width: 25px;
    height: 25px;
  }
      }
    }
  }
`;

const TextDiv = styled.div`
  margin-top: 8px;
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
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`;
export default Track;

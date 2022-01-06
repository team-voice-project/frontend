import React, { useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import MenuModal from "./MenuModal";
import PlayButton from "./playButton.png";
import PauseBtn from "./pauseBtn.png";

import { RiChat4Fill } from "react-icons/ri";

const Track = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY("hidden");
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <MenuModal props={props} open={modalOpen} close={closeModal} />
      <div style={{ position: "relative", margin: "0px" }}>
        <TrackDiv>
          <label>
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
            <div style={{ width: "100px", height: "15px", textAlign: "left" }}>
              <div style={{ display: "flex" }}>
                <Title>{props.title}</Title>
              </div>
            </div>
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
                <FcLike style={{ marginRight: "5px" }} />
                <Text>{props?.Likes?.likeCnt}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiChat4Fill style={{ marginRight: "5px", marginTop: "3px" }} />
                <Text>{props?.Comments?.length}</Text>
              </div>
            </div>
          </TextDiv>
        </div>
      </div>
    </>
  );
};

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
      bottom: 70px;
      right: 5px;
      background: url(${PauseBtn});
      background-color: #f1134e;
      background-size: 50%;
      background-position: center;
      background-repeat: no-repeat;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
`;

const TextDiv = styled.div`
  margin-top: 20px;
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
`;
export default Track;

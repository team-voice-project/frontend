import React, { useState } from "react";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { FaPlay } from "react-icons/fa";
import { BiPause } from "react-icons/bi";
import MenuModal from "./MenuModal";
import { useDispatch } from "react-redux";
import { RiChat4Fill } from "react-icons/ri";

const Track = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playBtn, setPlayBtn] = useState(false);
  const dispatch = useDispatch();
  console.log(props);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <MenuModal
        props={props}
        open={modalOpen}
        close={closeModal}
        header={"123"}
      />
      <div style={{ position: "relative" }}>
        {playBtn ? (
          <>
            <ImageCircle
              style={{
                border: "3px solid #f1134e ",
                transition: "all 300ms ease-in",
              }}
              src={props.TrackThumbnail?.trackThumbnailUrlFace}
            />

            <PlayBtn
              onClick={() => {
                setPlayBtn(false);
              }}
            >
              <BiPause
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              />
            </PlayBtn>
          </>
        ) : (
          <TrackDiv>
            <ImageCircle src={props.TrackThumbnail?.trackThumbnailUrlFace} />
            <PlayBtn
              onClick={() => {
                setPlayBtn(true);
              }}
            >
              <FaPlay
                style={{
                  color: "white",
                  marginLeft: "4px",
                  marginTop: "2px",
                }}
              />
            </PlayBtn>
          </TrackDiv>
        )}

        <div
          onClick={() => {
            openModal();
          }}
          style={{ cursor: "pointer" }}
        >
          <TextDiv>
            <div style={{ width: "80px", height: "15px", textAlign: "center" }}>
              <div style={{ display: "flex" }}>
                <Title>{props.title}</Title>
              </div>
            </div>
            <Text>{props.category}</Text>
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
                <Text>{props?.Likes?.length}</Text>
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
const PlayBtn = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 78px;
  left: 80px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  background: #f1134e;
  padding: 5px;
  @media screen and (max-width: 380px) {
    position: absolute;
    bottom: 80px;
    left: 55px;
    width: 30px;
    height: 30px;
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
  margin-top: 03px;
  font-size: 12px;
  color: white;
`;
export default Track;

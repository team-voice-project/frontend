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
      <div style={{ position: "relative", margin: "0px auto" }}>
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
          <>
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
          </>
        )}

        <div
          onClick={() => {
            openModal();
          }}
          style={{ cursor: "pointer" }}
        >
          <div style={{ width: "100px", height: "15px", textAlign: "center" }}>
            <div style={{ display: "flex" }}>
              <Title>{props.title}</Title>
              <p style={{ color: "white" }}>...</p>
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
              <Text>0</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RiChat4Fill style={{ marginRight: "5px", marginTop: "3px" }} />
              <Text>0</Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
  bottom: 60px;
  left: 70px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  background: #f1134e;
  padding: 5px;
  @media screen and (max-width: 380px) {
    position: absolute;
    bottom: 60px;
    left: 55px;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  height: 20px;
  overflow: hidden;
  color: white;
`;

const Text = styled.p`
  margin-top: 03px;
  font-size: 13px;
  color: white;
`;
export default Track;

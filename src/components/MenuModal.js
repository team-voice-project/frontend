import React, { Profiler, useEffect } from "react";
import styled from "styled-components";
import Container from "../elements/Container";
import { TiDeleteOutline } from "react-icons/ti";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import TestMusic from "./Testplay.mp3";
import AudioPlayer from "react-h5-audio-player";
import ReactAudioPlayer from "react-audio-player";

const MenuModal = (props) => {
  const { open, close } = props;

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <Section>
            <Container>
              <div style={{ textAlign: "right" }}>
                <TiDeleteOutline size="30px" color="white" onClick={close} />
              </div>
              <Profile>
                <ProfileCircle src={props.user_image} />
                <Name>용용자</Name>
              </Profile>
              <div style={{ textAlign: "center" }}>
                <ImageCircle src="data:image/jpeg;base64,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" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    lineHeight: "50%",
                  }}
                >
                  <FcLike style={{ marginRight: "5px" }} />
                  <Text>300</Text>
                </div>
                <div style={{ display: "flex", lineHeight: "50%" }}>
                  <AiOutlineComment
                    color="white"
                    style={{ marginRight: "5px" }}
                  />
                  <Text>300</Text>
                </div>
              </div>
              <Title>새벽에 어울리는 나래이션</Title>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Tag>간드러짐</Tag>
                <Tag>재치있는</Tag>
                <Tag>유머러스</Tag>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactAudioPlayer
                  autoPlay
                  src={TestMusic}
                  controls
                  style={{ height: "20px", width: "100%" }}
                />
              </div>
            </Container>
          </Section>
        ) : null}
      </div>
    </>
  );
};
MenuModal.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid black;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: cover;
`;

const ImageCircle = styled.img`
  cursor: pointer;
  width: 190px;
  height: 190px;
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

const Section = styled.div`
  position: absolute;
  z-index: 9900;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(10, 10, 10, 0.86);
`;
const Name = styled.p`
  font-size: 18px;
  color: white;
`;
const Title = styled.h1`
  margin-top: 10px;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const Tag = styled.button`
  margin: 10px 5px;
  font-size: 12px;
  color: white;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background: grey;
`;

const Text = styled.p`
  margin-top: 5px;
  font-size: 13px;
  color: white;
`;
export default MenuModal;

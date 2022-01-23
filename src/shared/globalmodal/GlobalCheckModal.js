import React from "react";
import styled from "styled-components";
import { apis } from "../api";

const GlobalCheckModal = (props) => {
  const { open, close } = props;
  console.log(props);

  const trackId = props.props.track_info.trackId;
  const deleteTrack = (trackId) => {
    apis.trackDelete(trackId).then((res) => {
      window.location.reload();
    });
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <BackGround>
            <Wrap>
              <Modal>
                <div>
                  <LogoImage
                    src={`${process.env.REACT_APP_TEST_API_URL}/trackThumbnail/OAO2_face.png`}
                  ></LogoImage>
                </div>

                <div style={{ textAlign: "center", marginTop: "70px" }}>
                  <Text>정말로 삭제하시겠어요?</Text>
                  <Text>정말요......?</Text>
                </div>

                <div style={{ margin: "30px 20px 10px 20px" }}>
                  <UpBtn onClick={close}>아니요. 더 보관할래요.</UpBtn>
                </div>
                <div style={{ margin: "0px 20px 10px 20px" }}>
                  <CancleBtn
                    onClick={() => {
                      deleteTrack(trackId);
                      close();
                    }}
                  >
                    네. 삭제할래요.
                  </CancleBtn>
                </div>
              </Modal>
            </Wrap>
          </BackGround>
        ) : null}
      </div>
    </>
  );
};

const BackGround = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  overflow-y: auto;
`;

const LogoImage = styled.img`
  position: absolute;
  left: 35%;
  right: 35%;
  bottom: 80%;
  width: 120px;
  height: 120px;
  z-index: 9999;
`;
const Text = styled.p`
  font-family: "GmarketSansBold", serif;
  color: black;
  font-size: 30px;
`;

const Wrap = styled.div`
  display: flex;
  max-width: 425px;
  width: 100%;
  margin: auto;
  justify-content: center;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 350px;
  max-width: 330px;
  width: 100%;
  margin: auto;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  @media screen and (max-height: 812px) {
    position: absolute;
    bottom: 200px;
  }
`;

const UpBtn = styled.button`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  width: 100%;
  height: 48px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background: black;
  color: white;
`;
const CancleBtn = styled.button`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  width: 100%;
  height: 48px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid black;
  background: white;
  color: black;
`;

export default GlobalCheckModal;

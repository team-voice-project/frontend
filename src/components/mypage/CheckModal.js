import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { apis } from "../../shared/api";

const CheckModal = (props) => {
  const { open, close } = props;

  const trackId = props.props.props.props.trackId;
  const deleteTrack = (trackId) => {
    apis.trackDelete(trackId).then((res) => {
      console.log(res);
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
                  <LogoImage src="http://52.79.253.64/trackThumbnail/OAO2_face.png"></LogoImage>
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
  font-family: "Black Han Sans", serif;
  color: black;
  font-size: 30px;
`;

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 350px;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 300px;
  background-color: white;
  border-radius: 10px;
`;

const UpBtn = styled.button`
  font-family: "Black Han Sans", serif;
  font-weight: 300;
  width: 100%;
  height: 48px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  background: black;
  color: white;
`;
const CancleBtn = styled.button`
  font-family: "Black Han Sans", serif;
  font-weight: 300;
  width: 100%;
  height: 48px;
  font-size: 20px;
  border-radius: 10px;
  border: 2px solid black;
  background: white;
  color: black;
`;

export default CheckModal;

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CheckModal from "./GlobalCheckModal";

const GlobalDeleteModal = (props) => {
  const { open, close } = props;
  const history = useHistory();
  const trackId = props?.track_info?.trackId;
  const [modalOpen, setModalOpen] = React.useState(false);
  console.log(props);
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "";
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        <CheckModal
          props={props}
          open={modalOpen}
          close={closeModal}
          header={"11123"}
        />
        {open ? (
          <BackGround>
            <Wrap>
              <Modal>
                <div style={{ margin: "20px 20px 10px 20px" }}>
                  <UpBtn
                    onClick={() => {
                      openModal();
                      close();
                    }}
                  >
                    삭제하기
                  </UpBtn>
                </div>
                <div style={{ margin: "0px 20px 40px 20px" }}>
                  <UpBtn
                    onClick={() => {
                      history.push(`/edit/base/${trackId}`);
                      close();
                    }}
                  >
                    수정하기
                  </UpBtn>
                </div>
                <div style={{ margin: "0px 20px 10px 20px" }}>
                  <CancleBtn onClick={close}>취소</CancleBtn>
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

const Wrap = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 425px;
  width: 100%;
  margin: auto;
  height: 270px;
  background-color: #2c2b2b;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const UpBtn = styled.button`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  width: 100%;
  height: 60px;
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
  height: 60px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background: white;
  color: black;
`;

export default GlobalDeleteModal;

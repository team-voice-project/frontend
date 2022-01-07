import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const LogoutModal = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <BackGround>
            <Wrap>
              <Modal>
                <div style={{ margin: "20px 20px 10px 20px" }}>
                  <UpBtn
                    onClick={() => {
                      dispatch(userActions.logOutDB());
                    }}
                  >
                    로그아웃
                  </UpBtn>
                </div>
                <div style={{ margin: "0px 20px 40px 20px" }}>
                  <UpBtn
                    onClick={() => {
                      history.push({
                        pathname: "/edit/profile",
                      });
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
  font-size: 25px;
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
  font-size: 25px;
  border-radius: 10px;
  border: none;
  background: white;
  color: black;
`;

export default LogoutModal;

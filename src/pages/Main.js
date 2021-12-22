import React from "react";
import KakaoLoginBtn from "../components/login/KakaoLoginBtn";
import styled from "styled-components";
import { Container, Text } from "../elements/index";
import OnBoarding from "../components/Onboarding";

const Main = (props) => {
  const [show_modal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    openModal();
  }, [0]);

const Main = (props) => {
  return (
    <>
      {show_modal && <OnBoarding setShowModal={setShowModal} />}
      <Container>
        <UploadBtn>나의 목소리 올리기</UploadBtn>
        <DivText>
          <text>나의 목소리를 올려서 사람들에게 들려주세요!</text>
        </DivText>
        <div style={{ marginBottom: "40 px" }}>
          <DivBoldText>
            <Text>최근에 올라온 목소리</Text>
            <div
              style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
            ></div>
          </DivBoldText>
          <Flex>
            <div>
              <Circle>{/* <Triangle /> */}</Circle>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
              </Count>
            </div>

            <div>
              <Circle>{/* <Triangle /> */}</Circle>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
              </Count>
            </div>

            <div>
              <Circle>{/* <Triangle /> */}</Circle>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
              </Count>
            </div>

            <div>
              <Circle>{/* <Triangle /> */}</Circle>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
              </Count>
            </div>

            <div>
              <Circle>{/* <Triangle /> */}</Circle>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
                <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
              </Count>
            </div>
          </Flex>
        </div>

        <DivBoldText>
          <Text>최근에 올라온 목소리</Text>
          <div
            style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
          ></div>
        </DivBoldText>
        <Flex>
          <div>
            <Circle>{/* <Triangle /> */}</Circle>
            <Title>깔끔한 목소리</Title>
            <Name>김명자</Name>
            <Count>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
            </Count>
          </div>
        </Flex>
      </Container>
    </>
  );
};

const UploadBtn = styled.button`
  width: 100%;
  background-color: #ddd;
  height: 7vh;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
`;

const DivText = styled.div`
  font-size: 14px;
  padding: 20px 0px 10px 0px;
  text-align: center;
`;

const DivBoldText = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Circle = styled.div`
  width: 120px;
  height: 120px;
  background-color: #ddd;
  border: 3px solid #f2f7b1;
  border-radius: 120px;
  margin: 20px 10px 15px 0px;
`;

// const Triangle = styled.div`
//   width: 0px;
//   height: 0px;
//   border-bottom: calc(18px * 1.732) solid #fff;
//   border-left: 18px solid transparent;
//   border-right: 18px solid transparent;
//   transform: rotate(90deg);
// `;

const Title = styled.div`
  font-size: 14px;
`;

const Name = styled.div`
  font-size: 12px;
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
`;
export default Main;

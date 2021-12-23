import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Container, Text } from "../elements/index";
import OnBoarding from "../components/Onboarding";
import Header from "../components/Header";

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
  return (
    <>
      {show_modal && <OnBoarding setShowModal={setShowModal} />}
      <Container>
        <SearchBar>
          <FlexSearchBar>
            <Logo></Logo>
            <Temdiv
              onClick={() => {
                history.push("/search");
              }}
            >
              검
            </Temdiv>
            <Temdiv>마</Temdiv>
            <Temdiv
              onClick={() => {
                history.push("/category");
              }}
            ></Temdiv>
          </FlexSearchBar>
        </SearchBar>

        <UploadBtn>나의 목소리 올리기</UploadBtn>
        <DivText>나의 목소리를 올려서 사람들에게 들려주세요!</DivText>

        <DivBoldText>
          <Text>최근에 올라온 목소리</Text>
          <div
            style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
          ></div>
        </DivBoldText>
        <Flex>
          <MarginDiv>
            <Circle>{/* <Triangle /> */}</Circle>
            <Title>깔끔한 목소리</Title>
            <Name>김명자</Name>
            <Count>
              <Flex>
                <IconDiv></IconDiv>
                <LikeComment>132</LikeComment>
              </Flex>
              <Flex>
                <IconDiv></IconDiv>
                <LikeComment>20</LikeComment>
              </Flex>
            </Count>
          </MarginDiv>

          <MarginDiv>
            <Circle>{/* <Triangle /> */}</Circle>
            <Title>깔끔한 목소리</Title>
            <Name>김명자</Name>
            <Count>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
            </Count>
          </MarginDiv>

          <MarginDiv>
            <Circle>{/* <Triangle /> */}</Circle>
            <Title>깔끔한 목소리</Title>
            <Name>김명자</Name>
            <Count>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
              <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
            </Count>
          </MarginDiv>
        </Flex>

        <DivBoldText>
          <Text>최근에 올라온 목소리</Text>
          <div
            style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
          ></div>
        </DivBoldText>
        <Flex>
          <MarginDiv>
            <Circle>{/* <Triangle /> */}</Circle>
            <Title>깔끔한 목소리</Title>
            <Name>김명자</Name>
            <Count>
              <Flex>
                <IconDiv></IconDiv>
                <LikeComment>132</LikeComment>
              </Flex>
              <Flex>
                <IconDiv></IconDiv>
                <LikeComment>20</LikeComment>
              </Flex>
            </Count>
          </MarginDiv>
        </Flex>
      </Container>
    </>
  );
};

const SearchBar = styled.div`
  width: 100%;
  height: 8vh;
`;

const FlexSearchBar = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 65px;
  height: 25px;
  background-color: #ddd;
`;

const Temdiv = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
`;

const UploadBtn = styled.button`
  width: 100%;
  background-color: #636363;
  height: 7vh;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
`;

const DivText = styled.div`
  font-size: 14px;
  padding: 15px 0px 10px 0px;
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

const MarginDiv = styled.div`
  margin-bottom: 24px;
`;

const Circle = styled.div`
  width: 135px;
  height: 135px;
  background-color: #ddd;
  border: 5px solid #e6cf00;
  border-radius: 120px;
  margin: 0px 12px 8px 0px;
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
  margin: 2px 0px;
`;

const Name = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 60px;
`;

const IconDiv = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: #ddd;
`;

const LikeComment = styled.div`
  font-size: 12px;
  margin-right: 4px;
`;

export default Main;

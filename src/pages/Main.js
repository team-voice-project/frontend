import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Container, Text } from "../elements/index";
import OnBoarding from "../components/Onboarding";
import Header from "../components/Header";
import PlayBox from "../components/PlayBox";

const Main = (props) => {
  const [show_modal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
    // document.body.style.overflow = "hidden";
  };

  React.useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      {show_modal && <OnBoarding setShowModal={setShowModal} />}
      <WrapDiv>
        <Wrap>
          <SearchBar>
            <FlexSearchBar>
              <Logo></Logo>
              <FlexIcon>
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
              </FlexIcon>
            </FlexSearchBar>
          </SearchBar>
          <UploadBtn>나도 목소리 올리기</UploadBtn>
          <DivText>나의 목소리를 올려서 사람들에게 들려주세요!</DivText>
        </Wrap>

        <Wrap>
          <DivBoldText>
            <Text>최근에 올라온 목소리</Text>
            <div
              style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
            ></div>
          </DivBoldText>
        </Wrap>

        <Flex>
          <PlayBox />
          <PlayBox />
          <PlayBox />
        </Flex>

        <Wrap>
          <DivBoldText>
            <Text>인기있는 나레이션</Text>
            <div
              style={{ width: "28px", height: "28px", backgroundColor: "#ddd" }}
            ></div>
          </DivBoldText>
        </Wrap>
      </WrapDiv>
    </>
  );
};

const WrapDiv = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
`;

const Wrap = styled.div`
  padding: 0px 20px;
`;

const SearchBar = styled.div`
  width: 100%;
  height: 11vh;
  background-color: #ececc8;
  padding-top: 40px;
`;

const FlexSearchBar = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 80px;
  height: 30px;
  background-color: #ddd;
`;

const FlexIcon = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Temdiv = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
  margin-left: 22px;
`;

const UploadBtn = styled.button`
  width: 100%;
  background-color: #636363;
  height: 7.5vh;
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

export default Main;

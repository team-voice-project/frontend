import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { Text } from "../../elements";
import OnBoarding from "../../components/category/Onboarding";
import Header from "../../components/category/Header";
import PlayBox from "../../components/category/PlayBox";
import MusicPlayer from "../../components/mypage/MusicPlayer";

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
      <Header topMenu />
      {show_modal && <OnBoarding setShowModal={setShowModal} />}
      <WrapDiv>
        <Wrap>
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

        <Flex>
          <PlayBox />
          <PlayBox />
          <PlayBox />
        </Flex>
        <MusicPlayer />
      </WrapDiv>
    </>
  );
};

const WrapDiv = styled.div`
  max-width: 425px;
  width: 100%;
  margin: 30px auto 0px auto;
`;

const Wrap = styled.div`
  padding: 0px 20px;
`;

const UploadBtn = styled.button`
  width: 100%;
  background-color: #f1134e;
  height: 65px;
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  border: #f1134e;
  border-radius: 10px;
`;

const DivText = styled.div`
  font-size: 12px;
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
  padding: 0px 20px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Main;

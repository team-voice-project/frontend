import React from "react";
import styled from "styled-components";
import CategoryModal from "../components/CategoryModal";
import Header from "../components/Header";
import { Container, Text } from "../elements/index";

const InCategory = () => {
  const [show_modal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Header />
      {show_modal && <CategoryModal setShowModal={setShowModal} />}
      <Container>
        <Flex style={{ justifyContent: "space-between" }}>
          <Text>카테고리> 나레이션</Text>
          <Tag onClick={openModal}></Tag>
        </Flex>

        <VoiceBox>
          <Circle>{/* <Triangle /> */}</Circle>
          <Title>깔끔한 목소리</Title>
          <Name>김명자</Name>
          <Count>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
          </Count>
        </VoiceBox>

        <VoiceBox>
          <Circle>{/* <Triangle /> */}</Circle>
          <Title>깔끔한 목소리</Title>
          <Name>김명자</Name>
          <Count>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
          </Count>
        </VoiceBox>

        <VoiceBox>
          <Circle>{/* <Triangle /> */}</Circle>
          <Title>깔끔한 목소리</Title>
          <Name>김명자</Name>
          <Count>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
          </Count>
        </VoiceBox>

        <VoiceBox>
          <Circle>{/* <Triangle /> */}</Circle>
          <Title>깔끔한 목소리</Title>
          <Name>김명자</Name>
          <Count>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
          </Count>
        </VoiceBox>

        <VoiceBox>
          <Circle>{/* <Triangle /> */}</Circle>
          <Title>깔끔한 목소리</Title>
          <Name>김명자</Name>
          <Count>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>132</div>
            <div style={{ fontSize: "12px", marginRight: "4px" }}>20</div>
          </Count>
        </VoiceBox>
      </Container>
    </>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const VoiceBox = styled.div`
  float: left;
`;

const Tag = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
`;

const Circle = styled.div`
  width: 118px;
  height: 118px;
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

export default InCategory;

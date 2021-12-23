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
      {/* <Header /> */}
      {show_modal && <CategoryModal setShowModal={setShowModal} />}
      <Wrap>
        <Div></Div>
        <Flex style={{ justifyContent: "space-between" }}>
          <Text>카테고리> 나레이션</Text>
          <IconTag onClick={openModal}></IconTag>
        </Flex>
        <TagGrid>
          <Tag>여성적인</Tag>
        </TagGrid>
        <VoiveBoxGrid>
          <VoiceBox>
            <Circle>{/* <Triangle /> */}</Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox>

          <VoiceBox>
            <Circle>{/* <Triangle /> */}</Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox>

          <VoiceBox>
            <Circle>{/* <Triangle /> */}</Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox>

          <VoiceBox>
            <Circle>{/* <Triangle /> */}</Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox>

          <VoiceBox>
            <Circle>{/* <Triangle /> */}</Circle>
            <Grid>
              <Title>깔끔한 목소리</Title>
              <Name>김명자</Name>
              <Count>
                <Icon></Icon>
                <CountText>132</CountText>
                <Icon></Icon>
                <CountText>20</CountText>
              </Count>
            </Grid>
          </VoiceBox>
        </VoiveBoxGrid>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  max-width: 425px;
  padding: 10px;
`;

const Div = styled.div`
  width: 100%;
  max-width: 425px;
  height: 8vh;
  background-color: #ddd;
  margin-bottom: 25px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px 10px;
`;

const VoiveBoxGrid = styled.div`
  margin: 10px 0px;
`;

const VoiceBox = styled.div`
  float: left;
  margin-bottom: 20px;
`;

const IconTag = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ddd;
`;

const TagGrid = styled.div`
  margin: 10px 8px 40px 15px;
`;

const Tag = styled.button`
  max-width: 100px;
  height: 34px;
  padding: 0px 12px;
  background-color: #acaaaa;
  color: #fff;
  font-size: 0.9em;
  border-radius: 20px;
  border: none;
  text-align: center;
  align-items: center;
  margin: 0px 12px 30px 0px;
  float: left;
`;

const Circle = styled.div`
  width: 115px;
  height: 115px;
  background-color: #acabab;
  /* border: 5px solid #fce300; */
  border-radius: 120px;
  margin: 20px 10px 15px 10px;
`;

const Grid = styled.div`
  padding: 0px 10px;
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
  font-size: 15px;
`;

const Name = styled.div`
  font-size: 12px;
  margin: 4px 0px;
`;

const Count = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 18px;
  height: 18px;
  background-color: #ddd;
  margin: 4px 6px 0px 0px;
`;

const CountText = styled.div`
  font-size: 12px;
  margin: 4px 12px 0px 0px;
`;

export default InCategory;

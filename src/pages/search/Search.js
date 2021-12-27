import React from "react";
import styled from "styled-components";
import qs from "qs";

import Header from "../../components/category/Header";
import { Container, Text } from "../../elements/index";
import Track from "../../components/mypage/Track";

const Search = () => {
  const [voice_search, setVoiceSearch] = React.useState("");

  const onChange = (e) => {
    setVoiceSearch(e.target.value);
  };

  return (
    <div>
      {/* 검색중 */}
      <Container>
        <div style={{ width: "100%", height: "58px" }}></div>
        <Flex>
          <Icon></Icon>
          <Text>검색</Text>
        </Flex>
        <Flex>
          <Multiline
            placeholder="검색어를 입력해주세요."
            type="text"
            onChange={onChange}
          ></Multiline>
          <Temp></Temp>
        </Flex>
      </Container>

      {/* 검색결과 나올때 */}
      {/* <Header topMenu />
      <Container>
        <Flex>
          <Temp></Temp>
          <Multiline
            style={{
              margin: "20px 0px",
            }}
            type="text"
            onChange={onChange}
          ></Multiline>
        </Flex>

        <TrackGrid>
          <TrackDiv>
            <Track />
          </TrackDiv>
        </TrackGrid>
      </Container> */}

      {/* 검색결과 없을 때 */}
      {/* <Header topMenu />
      <Container>
        <Flex>
          <Temp></Temp>
          <Multiline
            style={{
              margin: "20px 0px",
            }}
            type="text"
            onChange={onChange}
          ></Multiline>
        </Flex>
        <OAODiv>
          <OAOText>검색결과가 없습니다</OAOText>
          <OAOText>다시 한번 검색해주세요!</OAOText>
          <OAO></OAO>
        </OAODiv>
      </Container> */}
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const Icon = styled.div`
  width: 18px;
  height: 32px;
  background-color: #ddd;
  margin-right: 12px;
`;

const Multiline = styled.input`
  border: none;
  background: none;
  border-bottom: solid 3px #ddd;
  padding: 12px 4px;
  width: 100%;

  :focus {
    border: none;
    background: none;
    border-bottom: solid 3px #fa007d;
  }
`;

const Temp = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ddd;
  margin-left: 8px;
`;

const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TrackDiv = styled.div`
  margin: 0px 10px;
`;

const OAODiv = styled.div`
  position: relative;
  top: 160px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 200px;
  height: 210px;
  background-color: #fff;
  margin: 55px auto 0px auto;

  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
`;
export default Search;

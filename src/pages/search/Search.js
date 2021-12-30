import React, { useEffect } from "react";
import styled from "styled-components";
import qs from "qs";
import { useDispatch } from "react-redux";

import Header from "../../components/category/Header";
import { Container, Font } from "../../elements/index";
import Track from "../../components/mypage/Track";
import { actionCreators as searchActions } from "../../redux/modules/search";

import { apis } from "../../shared/api";

import { RiArrowLeftSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";

const Search = (props) => {
  const dispatch = useDispatch();

  const [seacrhTrack, setSearchTrack] = React.useState();
  const [show_modal, setShowmodal] = React.useState(true);

  const search_list = useSelector((state) => state);

  const inputRef = React.useRef();

  const openModal = () => {
    setShowmodal(true);
  };

  const closeModal = () => {
    setShowmodal(false);
  };

  const handleSearch = () => {
    const value = inputRef.current.value;
    console.log(value);
    dispatch(searchActions.getSearchDB(value));
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div>
      {/* 검색중 */}
      {/* 모달창으로 구현 */}
      {/* 검색어를 누르면 검색결과 */}
      {show_modal && (
        <BackGround>
          <Container>
            <div style={{ width: "100%", height: "58px" }}></div>
            <Flex>
              <RiArrowLeftSLine
                size="32"
                cursor="pointer"
                onClick={() => {
                  props.history.push("/");
                }}
              />
              <Font title fontSize="22px" margin="18px 0px">
                검색
              </Font>
            </Flex>
            <Flex>
              <Multiline
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="검색어를 입력해주세요."
                type="text"
              ></Multiline>
              <HiOutlineSearch
                size="30"
                cursor="pointer"
                onClick={onClick}
              ></HiOutlineSearch>
            </Flex>
          </Container>
        </BackGround>
      )}

      {/* 검색결과 나올때 */}
      {search_list ? (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <RiArrowLeftSLine size="30"></RiArrowLeftSLine>
              <Multiline
                style={{
                  margin: "20px 0px",
                }}
                type="text"
              ></Multiline>
            </Flex>

            <TrackGrid>
              <TrackDiv>
                <Track />
              </TrackDiv>
            </TrackGrid>
          </Container>
        </>
      ) : (
        <>
          <Header topMenu />
          <Container>
            <Flex>
              <Temp></Temp>
              <Multiline
                style={{
                  margin: "20px 0px",
                }}
                type="text"
              ></Multiline>
            </Flex>
            <OAODiv>
              <OAOText>검색결과가 없습니다</OAOText>
              <OAOText>다시 한번 검색해주세요!</OAOText>
              <OAO></OAO>
            </OAODiv>
          </Container>
        </>
      )}
    </div>
  );
};
const BackGround = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  z-index: 9999;
  overflow-y: auto;
`;

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
  color: #fff;

  :focus {
    border: none;
    background: none;
    border-bottom: solid 3px var(--point-color);
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

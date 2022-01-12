import React, { useEffect, useRef } from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";

import { useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { history } from "../../redux/configStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as trackCreators } from "../../redux/modules/mypage";
import Panparea from "../myPage/Pangparea.png";
import Master from "../myPage/master.png";

const PortfolioPage = (props) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.mypage.track);
  const user_info = useSelector((state) => state.mypage.user_info);
  const rank_data = useSelector((state) => state.mypage.rank_data);
  const userId = useParams()?.userId;
  const trackWrapRef = useRef(null);
  const voice = useParams()?.voice;
  console.log(rank_data.rank_data);

  useEffect(() => {
    dispatch(trackCreators.setTrackDB(userId));
  }, []);

  return (
    <Container padding={"0"}>
      <div
        style={{
          background: "#2C2B2B",
          padding: "30px 10px 10px 10px",
          height: "100%",
        }}
      >
        <RiArrowLeftSLine
          onClick={() => {
            history.goBack();
          }}
          size="30px"
          style={{ cursor: "pointer" }}
        />
        <Profile>
          <div style={{ width: "150px", height: "150px", marginRight: "10px" }}>
            <ImageCircle src={user_info.user_info?.profileImage} />
          </div>
          <div style={{ marginBottom: "40px" }}>
            <Name>{user_info.user_info?.nickname}</Name>
            <Link>{user_info.user_info?.contact}</Link>
            <div style={{ width: "200px", wordBreak: "break-word" }}>
              <Text>{user_info.user_info?.introduce}</Text>
            </div>
          </div>
        </Profile>
      </div>
      {voice === "voice_rank" ? (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            margin: "20px 0 0 0",
          }}
        >
          <label style={{ marginRight: "10px" }}>
            <FormCheckLeft
              type="radio"
              name="radioBtn"
              defaultChecked
              onClick={() => {
                history.push(`/portfolio/${userId}/voice_rank`);
              }}
            />
            <FormCheckText>보이스 분석</FormCheckText>
          </label>
          <label style={{ marginRight: "10px" }}>
            <FormCheckLeft
              type="radio"
              name="radioBtn"
              onClick={() => {
                history.push(`/portfolio/${userId}`);
              }}
            />
            <FormCheckText>트랙 리스트</FormCheckText>
          </label>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            margin: "20px 0 0 0",
          }}
        >
          <label style={{ marginRight: "10px" }}>
            <FormCheckLeft
              type="radio"
              name="radioBtn"
              onClick={() => {
                history.push(`/portfolio/${userId}/voice_rank`);
              }}
            />
            <FormCheckText>보이스 분석</FormCheckText>
          </label>
          <label style={{ marginRight: "10px" }}>
            <FormCheckLeft
              type="radio"
              name="radioBtn"
              defaultChecked
              onClick={() => {
                history.push(`/portfolio/${userId}`);
              }}
            />
            <FormCheckText>트랙 리스트</FormCheckText>
          </label>
        </div>
      )}
      {voice === "voice_rank" ? (
        <div style={{ margin: "30px auto" }}>
          <RankDiv>
            <RankTitle>{rank_data.rank_data?.rankClass.rank}위</RankTitle>
            <RankImg src={rank_data.rank_data.rankClass.classImage}></RankImg>

            <RankDic>
              "{rank_data.rank_data?.rankClass.class}"에요, 많은 사랑을 받은
              목소리네요!
            </RankDic>
            <div
              style={{
                display: "flex",
              }}
            >
              {rank_data.rank_data?.categoryTags.tags.map((p, idx) => {
                return <Tag key={idx}>{p}</Tag>;
              })}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  color: "#f1134e",
                  marginRight: "10px",
                  fontWeight: "700",
                }}
              >
                {rank_data.rank_data?.categoryTags.category}
              </span>
              <p>에 적합한 목소리에요!</p>
            </div>
          </RankDiv>
        </div>
      ) : track?.track_info === undefined || track?.track_info.length < 1 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <OAODiv>
            <OAOText>등록된 목소리가 없어요!</OAOText>
            <OAOText>목소리를 등록해 주세요!</OAOText>
            <OAO></OAO>
          </OAODiv>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TrackGrid ref={trackWrapRef}>
            {track?.track_info.map((p, idx) => {
              return (
                <TrackDiv key={p.trackId}>
                  <Track {...p} trackWrapRef={trackWrapRef.current} />
                </TrackDiv>
              );
            })}
          </TrackGrid>
        </div>
      )}
    </Container>
  );
};

PortfolioPage.defaultProps = {
  rank: "3위",
  oao_name: "마스터 와오",
};

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard Variable", serif;
  font-weight: 400;
  font-size: 14px;
  border: 0;
  padding: 10px 15px 11px 15px;
  color: #fff;
  background-color: #f1134e;
  border-radius: 20px;
  margin-right: 10px;
`;

const RankDic = styled.p`
  font-family: "Pretendard Variable", serif;
  font-size: 12px;
  margin: 10px 0 20px 0;
`;
const RankDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const RankImg = styled.img`
  width: 230px;
  height: 230px;
`;

const RankTitle = styled.h1`
  font-family: "GmarketSansBold", serif;
  font-size: 20px;
`;
const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const TrackDiv = styled.div`
  max-width: 120px;
  margin: 0px 0 0 20px;
  @media screen and (max-width: 422px) {
    margin: 0 0 0 20px;
    flex: 1;
  }
  @media screen and (max-width: 344px) {
    margin: 0 0 0 0 20px;
  }
`;

const OAODiv = styled.div`
  position: relative;
  top: 50px;
`;

const OAOText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

const OAO = styled.div`
  width: 200px;
  height: 210px;
  margin: 55px auto 0px auto;

  background-image: url("/assets/images/OAO.png");
  background-repeat: no-repeat;
  background-size: cover;
`;
const FormCheckText = styled.span`
  font-size: 15px;
  font-weight: 900;
  width: 110px;
  height: 35px;
  background: black;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #777;
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked + ${FormCheckText} {
    background: white;
    color: black;
  }
  display: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 380px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ImageCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-right: 20px;
  border: none;
  background: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Name = styled.h1`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  color: white;
  font-size: 20px;
  margin-right: 5px;
  @media screen and (max-width: 380px) {
    margin-top: 10px;
  }
`;

const Link = styled.p`
  font-size: 12px;
  color: white;
  font-weight: 600;
`;

const Text = styled.p`
  margin-top: 30px;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

export default PortfolioPage;

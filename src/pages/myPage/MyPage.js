import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Container from "../../elements/Container";
import Footer from "../../components/headerFooter/Footer";
import styled from "styled-components";
import Track from "../../components/mypage/Track";
import { BsFillGearFill } from "react-icons/bs";
import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators } from "../../redux/modules/mypage";
import { apis } from "../../shared/api";
import Panparea from "./Pangparea.png";
import Master from "./master.png";

import MypageHeader from "../../components/mypage/MypageHeader";
import LogoutModal from "../../components/mypage/LogoutModal";

const MyPage = (props) => {
  const track = useSelector((state) => state.mypage.track);
  const user_info = useSelector((state) => state.mypage.user_info);
  const like_track = useSelector((state) => state.mypage.like_track);
  const rank_data = useSelector((state) => state.mypage.rank_data);
  const like = useParams()?.like;
  const dispatch = useDispatch();
  const trackWrapRef = useRef(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "scroll";
  };

  useEffect(() => {
    apis.getProfile().then((res) => {
      const userId = res.data.user.userId;
      dispatch(actionCreators.setTrackDB(userId));
    });
  }, []);

  return (
    <>
      <MypageHeader topMenu props={props} />
      <LogoutModal open={modalOpen} close={closeModal} />
      <Container padding={"0"}>
        <div
          style={{
            background: "white",
            padding: "50px 10px 10px 10px",
            height: "100%",
          }}
        >
          <Profile>
            <div
              style={{
                width: "150px",
                height: "150px",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              <ImageCircle src={user_info.user_info?.profileImage} />
            </div>
            <div style={{ marginBottom: "50px" }}>
              <NameDiv style={{ display: "flex", alignItems: "center" }}>
                <Name>{user_info.user_info?.nickname}</Name>
                <BsFillGearFill
                  style={{
                    fontSize: "20px",
                    color: "#F1134E",
                    marginBottom: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    openModal();
                  }}
                />
                {/* <button
                  onClick={() => {
                    dispatch(userActions.logOutDB());
                  }}
                >
                  로그아웃
                </button> */}
              </NameDiv>
              <Link>
                {user_info.user_info?.contact
                  ? user_info.user_info?.contact
                  : "이메일 정보가 없습니다."}
              </Link>
              <div style={{ width: "200px", wordBreak: "break-word" }}>
                <Text>
                  {user_info.user_info?.introduce
                    ? user_info.user_info?.introduce
                    : "자기소개가 비어있습니다."}
                </Text>
              </div>
            </div>
          </Profile>
          <UpBtn
            onClick={() => {
              history.push("/edit/base");
            }}
          >
            나의 목소리 올리기{" "}
          </UpBtn>
        </div>

        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            margin: "20px 0 0 0",
          }}
        >
          {like === "like_list" ? (
            <>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage/rank_list");
                  }}
                />
                <FormCheckText>보이스 분석</FormCheckText>
              </label>
              <label style={{ marginRight: "10px" }}>
                <FormCheckLeft
                  type="radio"
                  value={"a" || ""}
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage");
                  }}
                />
                <FormCheckText>트랙 리스트</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  defaultChecked
                  onClick={() => {
                    history.push("/mypage/like_list");
                  }}
                />
                <FormCheckText>좋아요 목록</FormCheckText>
              </label>
            </>
          ) : like === "rank_list" ? (
            <>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  defaultChecked
                  onClick={() => {
                    history.push("/mypage/rank_list");
                  }}
                />
                <FormCheckText>보이스 분석</FormCheckText>
              </label>
              <label style={{ marginRight: "10px" }}>
                <FormCheckLeft
                  type="radio"
                  value={"a" || ""}
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage");
                  }}
                />
                <FormCheckText>트랙 리스트</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage/like_list");
                  }}
                />
                <FormCheckText>좋아요 목록</FormCheckText>
              </label>
            </>
          ) : (
            <>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage/rank_list");
                  }}
                />
                <FormCheckText>보이스 분석</FormCheckText>
              </label>
              <label style={{ marginRight: "10px" }}>
                <FormCheckLeft
                  type="radio"
                  value={"a" || ""}
                  name="radioBtn"
                  defaultChecked
                  onClick={() => {
                    history.push("/mypage");
                  }}
                />
                <FormCheckText>트랙 리스트</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="radioBtn"
                  onClick={() => {
                    history.push("/mypage/like_list");
                  }}
                />
                <FormCheckText>좋아요 목록</FormCheckText>
              </label>
            </>
          )}
        </div>
        {track?.track_info === undefined || track?.track_info.length < 1 ? (
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
          <TrackGrid ref={trackWrapRef}>
            {like === "like_list" ? (
              like_track.like_track?.length < 1 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px auto",
                  }}
                >
                  <OAODiv>
                    <OAOText>찜한 목소리가 없어요!</OAOText>
                    <OAOText>좋아요를 눌러주세요!</OAOText>
                    <OAO></OAO>
                  </OAODiv>
                </div>
              ) : (
                like_track.like_track?.map((p, idx) => {
                  return (
                    <TrackDiv key={p.trackId}>
                      <Track {...p} trackWrapRef={trackWrapRef.current} />
                    </TrackDiv>
                  );
                })
              )
            ) : like === "rank_list" ? null : (
              track?.track_info.map((p, idx) => {
                return (
                  <TrackDiv key={p.trackId}>
                    <Track {...p} trackWrapRef={trackWrapRef.current} />
                  </TrackDiv>
                );
              })
            )}
            {like === "rank_list" ? (
              <div style={{ margin: "30px auto" }}>
                <RankDiv>
                  <RankTitle>{rank_data.rank_data?.rankClass.rank}위</RankTitle>
                  <RankImg src={Master}></RankImg>
                  <PangImg src={Panparea}></PangImg>
                  <RankDic>
                    "{rank_data.rank_data?.rankClass.class}"에요, 많은 사랑을
                    받은 목소리네요!
                  </RankDic>
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      bottom: "140px",
                    }}
                  >
                    {rank_data.rank_data?.categoryTags.tags.map((p, idx) => {
                      return <Tag>{p}</Tag>;
                    })}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      bottom: "110px",
                      zIndex: "1",
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
            ) : null}
          </TrackGrid>
        )}
      </Container>
    </>
  );
};

MyPage.defaultProps = {
  rank: "3위",
  oao_name: "마스터 와오",
  rank_tag: ["잔잔한", "남자다운", "독특한"],
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
  z-index: 1;
  position: relative;
  bottom: 180px;
`;
const RankDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const RankImg = styled.img`
  width: 150px;
  height: 150px;
  z-index: 1;
`;
const PangImg = styled.img`
  position: relative;
  width: 100%;
  max-width: 425px;
  bottom: 180px;
  z-index: 0;
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
  width: 100px;
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
const NameDiv = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 380px) {
    justify-content: center;
    margin-top: 10px;
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

const UpBtn = styled.button`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background: #f1134e;
  color: white;
`;

const Name = styled.h1`
  font-family: "GmarketSansBold", serif;
  font-weight: 300;
  color: black;
  font-size: 19px;
  margin-right: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 120px;
`;

const Link = styled.p`
  font-size: 12px;
  color: black;
  font-weight: 600;
`;

const Text = styled.p`
  margin-top: 30px;
  color: black;
  font-size: 12px;
  font-weight: 600;
`;

export default MyPage;

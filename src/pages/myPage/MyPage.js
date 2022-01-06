import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";
import { BsFillGearFill } from "react-icons/bs";
import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators } from "../../redux/modules/mypage";
import { apis } from "../../shared/api";

import MypageHeader from "../../components/mypage/MypageHeader";
import LogoutModal from "../../components/mypage/LogoutModal";

const MyPage = (props) => {
  const track = useSelector((state) => state.mypage.track);
  const user_info = useSelector((state) => state.mypage.user_info);
  const like_track = useSelector((state) => state.mypage.like_track);
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
              style={{ width: "150px", height: "150px", marginRight: "10px" }}
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
              <Link>{user_info.user_info?.contact}</Link>
              <div style={{ width: "200px", wordBreak: "break-word" }}>
                <Text>{user_info.user_info?.introduce}</Text>
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
          ) : (
            <>
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
                    flexWrap: "wrap",
                    justifyContent: "center",
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
                      <Track {...p} />
                    </TrackDiv>
                  );
                })
              )
            ) : (
              track?.track_info.map((p, idx) => {
                return (
                  <TrackDiv key={p.trackId}>
                    <Track {...p} trackWrapRef={trackWrapRef.current} />
                  </TrackDiv>
                );
              })
            )}
          </TrackGrid>
        )}
      </Container>
    </>
  );
};

MyPage.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};
const TrackGrid = styled.div`
  max-width: 425px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  @media screen and (max-width: 425px) {
    justify-content: center;
  }
`;

const TrackDiv = styled.div`
  margin: 0px 7px;
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
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const UpBtn = styled.button`
  font-family: "Black Han Sans", serif;
  font-weight: 300;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  background: #f1134e;
  color: white;
`;

const Name = styled.h1`
  font-family: "Black Han Sans", serif;
  font-weight: 300;
  color: black;
  font-size: 24px;
  margin-right: 5px;
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

import React, { useEffect, useState } from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";
import MusicPlayer from "../../components/jinkePlayer/MusicPlayer";
import { useSelector } from "react-redux";
import DefaultImg from "./profileIMG.png";
import { RiArrowLeftSLine } from "react-icons/ri";
import { history } from "../../redux/configStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as trackCreators } from "../../redux/modules/mypage";

const PortfolioPage = (props) => {
  const dispatch = useDispatch();
  const [checkedInputs, setCheckedInputs] = useState([]);
  const track = useSelector((state) => state.mypage.track);
  const user_info = useSelector((state) => state.mypage.user_info);
  const userId = useParams()?.userId;
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  useEffect(() => {
    dispatch(trackCreators.setTrackDB(userId));
  }, []);

  return (
    <Container>
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
          <div>
            <Name>{user_info.user_info?.nickname}</Name>
            <Link>{user_info.user_info?.contact}</Link>
            <div style={{ width: "200px", wordBreak: "break-word" }}>
              <Text>{user_info.user_info?.introduce}</Text>
            </div>
          </div>
        </Profile>
      </div>

      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          margin: "20px 0 0 0",
        }}
      >
        <label style={{ marginRight: "10px" }}>
          <FormCheckLeft type="radio" name="radioBtn" checked />
          <FormCheckText>트랙 리스트</FormCheckText>
        </label>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            justifyItems: "left",
          }}
        >
          {track?.track_info.map((p, idx) => {
            return <Track key={idx} {...p} />;
          })}
        </div>
      )}
    </Container>
  );
};

PortfolioPage.defaultProps = {
  user_image: DefaultImg,
};

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

const Name = styled.h1`
  font-family: "Black Han Sans", serif;
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 5px;
  color: white;
`;

const Link = styled.p`
  font-size: 15px;
  color: white;
  font-weight: 600;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: white;
  font-weight: 600;
`;

export default PortfolioPage;

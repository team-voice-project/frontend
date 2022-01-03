import React, { useEffect, useState } from "react";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";
import MusicPlayer from "../../components/mypage/MusicPlayer";
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
        />
        <Profile>
          <ImageCircle src={user_info.user_info?.profileImage} />
          <div>
            <Name>{user_info.user_info?.nickname}</Name>
            <Link href="http://www.naver.com" target="_blank">
              {user_info.user_info?.contact}
            </Link>
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
          <FormCheckLeft
            type="radio"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>트랙 리스트</FormCheckText>
        </label>
        <label>
          <FormCheckLeft
            type="radio"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>좋아요 목록</FormCheckText>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0px",
          justifyContent: "space-between",
        }}
      >
        {track.track_info === undefined ? (
          <Track />
        ) : (
          track.track_info.map((p, idx) => {
            return <Track key={idx} {...p} />;
          })
        )}
      </div>
      <MusicPlayer />
    </Container>
  );
};

PortfolioPage.defaultProps = {
  user_image: DefaultImg,
};
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
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
  border: none;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 380px) {
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
  }
`;

const Name = styled.h1`
  font-family: "Black Han Sans", serif;
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 5px;
  color: white;
`;

const Link = styled.a`
  font-size: 15px;
  color: white;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: white;
`;

export default PortfolioPage;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../elements/Container";
import styled from "styled-components";
import Track from "../../components/mypage/Track";
import { RiPencilFill } from "react-icons/ri";
import MusicPlayer from "../../components/mypage/MusicPlayer";
import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/modules/mypage";
import { apis } from "../../shared/api";
import Header from "../../components/category/Header";

const MyPage = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const track = useSelector((state) => state.mypage.track);
  const user_info = useSelector((state) => state.mypage.user_info);
  const dispatch = useDispatch();

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  useEffect(() => {
    apis.getProfile().then((res) => {
      const userId = res.data.user.userId;
      dispatch(actionCreators.setTrackDB(userId));
    });
  }, []);

  return (
    <>
      <Header topMenu props={props} />
      <Container>
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
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Name>{user_info.user_info?.nickname}</Name>
                <RiPencilFill
                  style={{
                    fontSize: "20px",
                    color: "#F1134E",
                    marginBottom: "7px",
                  }}
                  onClick={() => {
                    history.push({
                      pathname: "/edit/profile",
                    });
                  }}
                />
              </div>
              <Link href="http://www.naver.com" target="_blank">
                {user_info.user_info?.contact}
              </Link>
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
          <label style={{ marginRight: "10px" }}>
            <FormCheckLeft
              type="radio"
              {...props}
              id={props.id}
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>트랙 리스트</FormCheckText>
          </label>
          <label>
            <FormCheckLeft
              type="radio"
              {...props}
              id={props.id}
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>좋아요 목록</FormCheckText>
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

        <MusicPlayer />
      </Container>
    </>
  );
};

MyPage.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
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
  font-size: 18px;
  margin-bottom: 0px;
  margin-right: 5px;
`;

const Link = styled.a`
  font-size: 15px;
  color: black;
`;

const Text = styled.p`
  margin-top: 10px;
  color: black;
  font-size: 13px;
`;

export default MyPage;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { apis } from "../../shared/api";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { actionCreators as userActions } from "../../redux/modules/user";
import {
  DEFAULT_PROFILE_URL,
  emailValidCheck,
  nickValidCheck,
} from "../../shared/utils";

import Container from "../../elements/Container";
import { Font } from "../../elements";
import { RiArrowLeftSLine } from "react-icons/ri";
import { HiCheck } from "react-icons/hi";
import { newGetCookie, setCookie } from "../../shared/Cookie";

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();
  const skipBtnRef = useRef(null);
  const params = useParams();
  const [next_btn_disabled, setNextBtnDisabeld] = useState(false);
  const [nick_value, setNickValue] = useState("");
  const [email_value, setEmailValue] = useState("");
  const [about_value, setAboutValue] = useState("");
  const [nick_alert, setNickAlert] = useState(false);
  const [email_alert, setEmailAlert] = useState(false);
  const [photo_url, setPhotoUrl] = useState();
  const [photo_obj, setPhotoObj] = useState(null);
  const is_first = params?.is_first == "first";

  const fetchProfileData = async () => {
    try {
      const res = await apis.getProfile();
      return res.data.user;
    } catch (err) {
      console.log("[fetchProfileData] 프로필 조회 실패", err.response);
      return null;
    }
  };

  useEffect(async () => {
    const profile = await fetchProfileData();
    if (!profile) {
      return;
    }

    setNickValue(profile.nickname);
    setEmailValue(profile.contact);
    setAboutValue(profile.introduce);
    setPhotoUrl(profile.profileImage);
  }, []);

  useEffect(() => {
    if (
      nickValidCheck(nick_value).passed &&
      emailValidCheck(email_value).passed
    ) {
      //  넥스트 버튼 활성화
      setNextBtnDisabeld(false);
    } else {
      //  넥스트 버튼 비활성화
      setNextBtnDisabeld(true);
    }
  }, [nick_value, email_value, about_value]);

  useEffect(() => {
    // 닉네임 유효성 검사
    if (nickValidCheck(nick_value).passed) {
      // 건너뛰기 on
      skipBtnRef.current.classList.remove("disabled");
      setNickAlert(false);
    } else {
      // 건너뛰기 off
      skipBtnRef.current.classList.add("disabled");
      setNickAlert(nickValidCheck(nick_value).msg);
    }
  }, [nick_value]);

  useEffect(() => {
    // 이메일 유효성 검사
    if (emailValidCheck(email_value).passed) {
      setEmailAlert(false);
    } else {
      setEmailAlert(emailValidCheck(email_value).msg);
    }
  }, [email_value]);

  const goNextPage = () => {
    if (is_first) {
      history.push("/");
    } else {
      history.push("/mypage");
    }
  };

  const handleChangeNick = (e) => {
    setNickValue(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handleChangeAbout = (e) => {
    setAboutValue(e.target.value);
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoUrl(reader.result);
      setPhotoObj(e.target.files[0]);
    };
  };

  const handleClickSkipBtn = () => {
    goNextPage();
  };

  const sendProfileData = async () => {
    const data = new FormData();
    data.append("nickname", nick_value);
    data.append("contact", email_value);
    data.append("introduce", about_value);
    data.append("profileImage", photo_obj);

    try {
      return await apis.editProfile(data);
    } catch (err) {
      return err.response;
    }
  };

  const handleClickApplyBtn = async () => {
    const result = await sendProfileData();
    if (result.status === 200) {
      const token = newGetCookie("token");
      setCookie("OAO", `__OAO-nick=${nick_value}__OAO-token=${token}`, 1);
      dispatch(userActions.setUser({ user: nick_value, is_login: true }));
      goNextPage();
    } else {
      alert("[Error] 프로필을 변경 할 수 없습니다 :(");
      console.log("실패 시점", result);
    }
  };

  return (
    <EditWrap>
      <div className={"fixed-box"}>
        <Container>
          <button
            type={"button"}
            className={"skip-btn"}
            ref={skipBtnRef}
            onClick={handleClickSkipBtn}
          >
            <Font m>건너뛰기</Font>
          </button>
        </Container>
      </div>

      <Container>
        <nav className={"edit-header"}>
          <RiArrowLeftSLine
            className={"back-btn"}
            onClick={() => history.goBack()}
          />
          <Font title fontSize={"22px"} _className={"edit-title"}>
            프로필 설정
          </Font>
          <button
            type={"button"}
            className={"apply-btn"}
            disabled={next_btn_disabled}
            onClick={handleClickApplyBtn}
          >
            <HiCheck />
          </button>
        </nav>

        <div className={"edit-body"}>
          {is_first && (
            <p className={"guide-text"}>랜덤 닉네임이 지급되었습니다!</p>
          )}

          <div className={"profile-photo"}>
            <div className={"photo-box"}>
              <img src={photo_url ? photo_url : DEFAULT_PROFILE_URL} alt="" />
            </div>
          </div>

          <div className={"photo-control"}>
            <label htmlFor="change-file" className={"change-file-btn"}>
              <input
                type="file"
                id={"change-file"}
                accept="image/*"
                onChange={handleChangePhoto}
              />
              프로필 사진 바꾸기
            </label>
          </div>

          <div className={"profile-controls"}>
            <div className={"profile-control-item"}>
              {nick_alert && <span className={"alert-msg"}>{nick_alert}</span>}

              <label htmlFor={"profile-nick"}>
                <Font m>닉네임</Font>
              </label>
              <input
                type="text"
                placeholder="입력하기"
                id={"profile-nick"}
                defaultValue={nick_value}
                onChange={handleChangeNick}
                autoComplete="off"
              />
            </div>
            <div className={"profile-control-item"}>
              {email_alert && (
                <span className={"alert-msg"}>{email_alert}</span>
              )}
              <label htmlFor={"profile-email"}>
                <Font m>이메일</Font>
              </label>
              <input
                type="text"
                placeholder="입력하기"
                id={"profile-email"}
                defaultValue={email_value}
                onChange={handleChangeEmail}
                autoComplete="off"
              />
            </div>
            <div className={"profile-control-item expand"}>
              <label htmlFor={"profile-about"}>
                <Font m>자기소개</Font>
              </label>
              <textarea
                placeholder="입력하기"
                id={"profile-about"}
                defaultValue={about_value}
                onChange={handleChangeAbout}
              ></textarea>
            </div>
          </div>
        </div>
      </Container>
    </EditWrap>
  );
};

const EditWrap = styled.section`
  .fixed-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: right;

    .skip-btn {
      padding: 10px 20px;
      margin-bottom: 20px;
      border: 0;
      background: none;
      color: var(--point-color);

      &.disabled {
        color: #696969;
        pointer-events: none;
      }
    }
  }

  .edit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 47px;

    .edit-title {
      position: relative;
      top: 3px;
    }

    .back-btn {
      cursor: pointer;
      font-size: 30px;
      margin-right: 15px;
    }

    .apply-btn {
      border: 0;
      background: none;
      cursor: pointer;
      font-size: 28px;
      margin-left: auto;
      color: var(--point-color);
      display: flex;
      align-items: center;

      &:disabled {
        color: #696969;
      }
    }
  }

  .edit-body {
    .guide-text {
      color: #c4c4c4;
      font-size: 12px;
      text-align: center;
    }

    .profile-photo {
      margin: 20px 0;

      .photo-box {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        margin: 0 auto;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .photo-control {
      text-align: center;
      margin-bottom: 20px;
    }

    .change-file-btn {
      font-size: 14px;
      text-align: center;
      color: var(--point-color);
      cursor: pointer;

      input {
        display: none;
      }
    }

    .profile-controls {
      .profile-control-item {
        display: flex;
        padding: 20px 0;
        border-top: 1px solid #2c2b2b;
        position: relative;

        .alert-msg {
          position: absolute;
          top: 50%;
          right: 5px;
          font-size: 10px;
          padding: 2.5px 8px 3px 8px;
          border-radius: 2px;
          background-color: var(--point-color);
          transform: translateY(-50%);
        }

        label {
          width: 88px;
          flex-shrink: 0;
        }

        input,
        textarea {
          width: 100%;
          color: #fff;
          border: 0;
          background: none;
          font-size: 16px;

          &::placeholder {
            font-size: 16px;
            font-family: "Pretendard Variable", serif;
          }
        }

        textarea {
          min-height: 75px;
          max-height: 140px;
        }
      }
    }
  }
`;

const Title = styled.h1`
  width: 30%;
  font-size: 20px;
  padding: 0 0px 0 0;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  border: none;
  color: white;
  background: none;
`;

const InputLast = styled.textarea`
  width: 100%;
  height: 400px;
  border: none;
  background: none;
  color: white;
`;
export default EditProfile;

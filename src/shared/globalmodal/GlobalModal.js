import React, { useState } from "react";
import styled from "styled-components";
import Container from "../../elements/Container";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { ImShare } from "react-icons/im";
import CommentList from "../../components/mypage/CommentList";
import CommentWrite from "../../components/mypage/CommentWrite";
import DetailTag from "../../components/mypage/DetailTag";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMoreVert } from "react-icons/md";
import SingleAudioPlayer from "../SingleAudioPlayer";
import { apis } from "../api";
import { RiChat4Fill } from "react-icons/ri";
import GlobalDeleteModal from "./GlobalDeleteModal";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators } from "../../redux/modules/mypage";
import { actionCreators as modalAction } from "../../redux/modules/modal";
import { newGetCookie } from "../Cookie";

const GlobalModal = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.comment.comments);
  const track_info = useSelector((state) => state.modal.track_info);
  const [LikeCnt, setLikeCnt] = React.useState();
  const userId = track_info?.userId;
  const trackId = track_info?.trackId;
  const nick = newGetCookie("nick");
  const trackNick = track_info?.User?.nickname;
  const isMe = trackNick === nick;
  const setTrack = () => {
    apis.getProfile().then((res) => {
      const userId = res.data.user.userId;
      dispatch(actionCreators.setTrackDB(userId));
    });
  };
  const setMainTrack = () => {
    dispatch(postActions.loadPostDB());
  };
  const close = () => {
    dispatch(modalAction.viewModal(false));
  };

  const likeBtn = (trackId) => {
    apis.likeTrack(trackId).then((res) => {
      const boolean = res.data.result.like;
      const likeCnt = res.data.result.likeCnt;
      localStorage.setItem(trackId, boolean);
      setLikeCnt(likeCnt);
      setTrack();
      setMainTrack();
    });
  };

  const local = localStorage.getItem(trackId);
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "scroll";
  };

  return (
    <>
      <div className={"openModal modal"}>
        <GlobalDeleteModal
          props={props}
          track_info={track_info}
          open={modalOpen}
          close={closeModal}
          header={"123"}
        />

        <Section>
          <Container>
            <div
              style={{
                display: "block",
                textAlign: "end",
                verticalAlign: "center",
              }}
            >
              {isMe && (
                <MdOutlineMoreVert
                  size="20px"
                  style={{ margin: "13px 10px 0 0px", cursor: "pointer" }}
                  onClick={() => {
                    openModal();
                  }}
                />
              )}

              <ImShare
                onClick={() => {
                  history.push(`/share/${trackId}`);
                }}
                style={{ cursor: "pointer" }}
                size="20px"
              />
              <AiOutlineClose
                style={{
                  margin: "13px 0px 0px 10px",

                  cursor: "pointer",
                }}
                size="20px"
                color="white"
                onClick={() => {
                  close();
                  dispatch(commentActions.setCommentDB(trackId));
                }}
              />
            </div>
            {nick === trackNick ? (
              <Profile
                onClick={() => {
                  history.push("/mypage/rank_list");
                  close();
                }}
              >
                <ProfileCircle src={track_info.User.profileImage} />
                <Name>{track_info.User.nickname}</Name>
              </Profile>
            ) : (
              <Profile
                onClick={() => {
                  history.push({
                    pathname: `/portfolio/${userId}/voice_rank`,
                  });
                  close();
                }}
              >
                <ProfileCircle src={track_info.User?.profileImage} />
                <Name>{track_info.User?.nickname}</Name>
              </Profile>
            )}

            <div style={{ textAlign: "center" }}>
              <ImageCircle
                src={track_info.TrackThumbnail?.trackThumbnailUrlFull}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {track_info?.TrackTags?.map((p, idx) => {
                return <DetailTag bg="black" key={idx} {...p}></DetailTag>;
              })}
            </div>
            <Title>{track_info.title}</Title>

            <SingleAudioPlayer
              // autoPlay
              audio={track_info.trackUrl}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: "15px",
                  lineHeight: "50%",
                }}
              >
                {local === "true" ? (
                  <BsFillHeartFill
                    onClick={() => {
                      likeBtn(trackId);
                    }}
                    style={{
                      fontSize: "22px",
                      color: "red",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <BsFillHeartFill
                    onClick={() => {
                      likeBtn(trackId);
                    }}
                    style={{
                      fontSize: "22px",
                      color: "white",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  />
                )}
                {LikeCnt === undefined ? (
                  <Text>{track_info.Likes?.likeCnt}</Text>
                ) : (
                  <Text>{LikeCnt}</Text>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "2px",
                  lineHeight: "80%",
                }}
              >
                <RiChat4Fill
                  color="white"
                  style={{
                    fontSize: "22px",
                    color: "#545454",
                    marginRight: "5px",
                  }}
                />
                <Text>{track_info?.Comments?.length}</Text>
              </div>
            </div>
            <div
              style={{
                margin: "10px 0px",
                minHeight: "120px",
                maxHeight: "120px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {state?.length !== 0
                ? state?.map((p, idx) => {
                    return <CommentList {...props} key={idx} {...p} />;
                  })
                : track_info.Comments?.map((p, idx) => {
                    return <CommentList {...props} key={idx} {...p} />;
                  })}
            </div>
            <CommentWrite {...props} />
          </Container>
        </Section>
      </div>
    </>
  );
};
const Profile = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  cursor: pointer;
`;

const ProfileCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: none;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ImageCircle = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 30px 0px 0px 0px;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 380px) {
    width: 80px;
    height: 80px;
  }
`;

const Section = styled.div`
  position: fixed;
  z-index: 9900;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(10, 10, 10, 0.86);
  backdrop-filter: blur(10px);
`;

const Name = styled.p`
  font-size: 18px;
  color: white;
`;
const Title = styled.h1`
  margin: 0 0 10px 0px;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const Text = styled.p`
  margin-top: 5px;
  font-size: 17px;
  color: white;
`;
export default GlobalModal;

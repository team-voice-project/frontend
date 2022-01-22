import React, { useState } from "react";
import styled from "styled-components";
import Container from "../../elements/Container";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { ImShare } from "react-icons/im";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import DetailTag from "./DetailTag";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMoreVert } from "react-icons/md";
import SingleAudioPlayer from "../../shared/SingleAudioPlayer";
import { apis } from "../../shared/api";
import { RiChat4Fill } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators } from "../../redux/modules/mypage";
import { newGetCookie } from "../../shared/Cookie";

const MenuModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const state = useSelector((state) => state.comment.comments);
  const [LikeCnt, setLikeCnt] = React.useState();
  const userId = props.props.userId;
  const trackId = props.props?.trackId;
  const nick = newGetCookie("nick");
  const trackNick = props.props.User.nickname;
  const isMe = props.props.User.nickname === nick;
  const setTrack = () => {
    apis.getProfile().then((res) => {
      const userId = res.data.user.userId;
      dispatch(actionCreators.setTrackDB(userId));
    });
  };
  const setMainTrack = () => {
    dispatch(postActions.loadPostDB());
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
      {open && (
        <div className={"openModal modal"}>
          <DeleteModal
            props={props}
            open={modalOpen}
            close={closeModal}
            header={"123"}
          />
          {open ? (
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
                    <ProfileCircle src={props.props.User.profileImage} />
                    <Name>{props.props.User.nickname}</Name>
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
                    <ProfileCircle src={props.props.User.profileImage} />
                    <Name>{props.props.User.nickname}</Name>
                  </Profile>
                )}

                <div style={{ textAlign: "center" }}>
                  <ImageCircle
                    src={props.props.TrackThumbnail?.trackThumbnailUrlFull}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {props.props.TrackTags.map((p, idx) => {
                    return <DetailTag bg="black" key={idx} {...p}></DetailTag>;
                  })}
                </div>
                <Title>{props.props.title}</Title>

                <SingleAudioPlayer
                  // autoPlay
                  audio={props.props.trackUrl}
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
                      <Text>{props.props.Likes.likeCnt}</Text>
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
                    <Text>{props.props.Comments.length}</Text>
                  </div>
                </div>
                <Comments
                  style={{
                    margin: "10px 0px",
                    minHeight: "120px",
                    maxHeight: "120px",
                    overflowY: "scroll",
                    // overflowX: "hidden",
                  }}
                >
                  {state?.length !== 0
                    ? state?.map((p, idx) => {
                        return <CommentList {...props} key={idx} {...p} />;
                      })
                    : props.props.Comments.map((p, idx) => {
                        return <CommentList {...props} key={idx} {...p} />;
                      })}
                </Comments>
                <CommentWrite {...props} />
              </Container>
            </Section>
          ) : null}
        </div>
      )}
    </>
  );
};

MenuModal.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
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

  z-index: 9000;
  -webkit-transform: translateZ(9000px);

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

const Comments = styled.div`
  margin: 10px 0px;
  min-height: 120px;
  max-height: 120px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 6px;
    overflow: auto;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--point-color);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #000;
  }
`;
export default MenuModal;

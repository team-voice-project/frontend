import React from "react";
import styled from "styled-components";
import Container from "../../elements/Container";
import { IoIosClose } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { ImShare } from "react-icons/im";
import { AiOutlineComment } from "react-icons/ai";
import ReactAudioPlayer from "react-audio-player";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import DetailTag from "./DetailTag";
import { history } from "../../redux/configStore";

const MenuModal = (props) => {
  const { open, close } = props;


  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <Section>
            <Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <ImShare size="20px" />
                <IoIosClose size="40px" color="white" onClick={close} />
              </div>
              <Profile
                onClick={() => {
                  history.push({
                    pathname: "/portfolio",
                    props,
                  });
                  close();
                }}
              >
                <ProfileCircle src={props.user_image} />
                <Name>{props.props.User.nickname}</Name>
              </Profile>
              <div style={{ textAlign: "center" }}>
                <ImageCircle
                  src={props.props.TrackThumbnail?.trackThumbnailUrlFace}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  <FcLike style={{ marginRight: "5px" }} />
                  <Text>{props.props.Likes.length}</Text>
                </div>
                <div style={{ display: "flex", lineHeight: "50%" }}>
                  <AiOutlineComment
                    color="white"
                    style={{ marginRight: "5px" }}
                  />
                  <Text>{props.props.Comments.length}</Text>
                </div>
              </div>
              <Title>{props.props.title}</Title>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {props.props.TrackTags.map((p, idx) => {
                  return <DetailTag key={idx} {...p}></DetailTag>;
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactAudioPlayer
                  // autoPlay
                  src={props.props.trackUrl}
                  controls
                  style={{ height: "20px", width: "100%" }}
                />
              </div>
              <div
                style={{
                  margin: "10px 0px",
                  height: "410px",
                  overflowY: "scroll",
                }}
              >
                {props.props.Comments.map((p, idx) => {
                  return <CommentList key={idx} {...p} />;
                })}
              </div>
              <CommentWrite {...props} />
            </Container>
          </Section>
        ) : null}
      </div>
    </>
  );
};
MenuModal.defaultProps = {
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXaZTRs1NC8dvfYkOxERlkyi-nEMnP15bag&usqp=CAU",
};

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid black;
  background: url("${(props) => props.src}");
  background-size: 100%;
  background-position: center;
  background-repeat: cover;
`;

const ImageCircle = styled.img`
  cursor: pointer;
  width: 190px;
  height: 190px;
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
  position: absolute;
  z-index: 9900;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  height: 130%;
  background-color: rgba(10, 10, 10, 0.86);
  backdrop-filter: blur(4px);
`;

const Name = styled.p`
  font-size: 18px;
  color: white;
`;
const Title = styled.h1`
  margin-top: 10px;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const Text = styled.p`
  margin-top: 5px;
  font-size: 13px;
  color: white;
`;
export default MenuModal;

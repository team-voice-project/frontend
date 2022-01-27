import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as playerActions } from "../../redux/modules/globalPlayer";

import { BiPause } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import MenuModal from "../mypage/MenuModal";
import { RiChat4Fill } from "react-icons/ri";

const PlayBox = (props) => {
  const dispatch = useDispatch();
  const Image = props.TrackThumbnail.trackThumbnailUrlFace;
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "scroll";
  };

  const PlayTargetTrack = async () => {
    const uniqIdx = props.uniq.split("-").pop();
    const now_track = {
      uniqIdx: uniqIdx,
      trackId: props.trackId,
      name: props.title,
      singer: props.User.nickname,
      cover: props.TrackThumbnail,
      musicSrc: props.trackUrl,
    };

    await dispatch(playerActions.play(now_track));
  };

  const PauseTargetTrack = async () => {
    await dispatch(playerActions.stop());
  };

  return (
    <div>
      <Flex>
        <MenuModal
          props={props}
          open={modalOpen}
          close={closeModal}
          header={"123"}
        />
        <MarginDiv>
          {props.active === true ? (
            <CircleDiv
              onClick={() => {
                const changed_list = props.all_list.map((article) => {
                  return {
                    category: article.category,
                    tracks: article.tracks.map((track) => {
                      track.active = false;
                      return track;
                    }),
                  };
                });

                props.setAllListData(changed_list);

                // global player pause
                PauseTargetTrack();
              }}
            >
              <Circle
                src={Image ? Image : "/assets/images/OAOgray.png"}
                style={{
                  border: "5px solid #f1134e ",
                  transition: "all 300ms ease-in",
                }}
              />
              <PlayButton>
                <BiPause className="pause-btn" />
              </PlayButton>
            </CircleDiv>
          ) : (
            <CircleDiv
              onClick={() => {
                const changed_list = props.all_list.map((article) => {
                  return {
                    category: article.category,
                    tracks: article.tracks.map((track) => {
                      if (track.uniq === props.target_uniq) {
                        track.active = true;
                        return track;
                      } else {
                        track.active = false;
                        return track;
                      }
                    }),
                  };
                });

                props.setAllListData(changed_list);

                // global player play
                PlayTargetTrack();
              }}
            >
              <Circle src={Image ? Image : "/assets/images/OAOgray.png"} />
              <PlayButton>
                <FaPlay
                  style={{
                    color: "white",
                    marginLeft: "4px",
                    marginTop: "2px",
                  }}
                />
              </PlayButton>
            </CircleDiv>
          )}

          <div
            onClick={() => {
              openModal();
            }}
            style={{ cursor: "pointer" }}
          >
            <div style={{ width: "100px", height: "15px", textAlign: "left" }}>
              <div style={{ display: "flex" }}>
                <Title>{props.title}</Title>
              </div>
            </div>
            <Text>{props.User.nickname}</Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: "15px",
                  alignItems: "center",
                }}
              >
                <HiHeart style={{ marginRight: "5px", marginTop: "3px" }} />
                <Text>{props.Likes.likeCnt}</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiChat4Fill style={{ marginRight: "5px", marginTop: "3px" }} />
                <Text>{props.Comments.length}</Text>
              </div>
            </div>
          </div>
        </MarginDiv>
      </Flex>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Text = styled.p`
  margin-top: 03px;
  font-size: 13px;
  color: white;
`;

const MarginDiv = styled.div`
  margin: 0 0 20px 0;
  @media screen and (max-width: 360px) {
    margin: 0 10px 20px 0;
  }
`;

const CircleDiv = styled.div`
  width: 150px;
  height: 118px;
  /* background-color: #ddd; */
  border-radius: 120px;
  display: flex;
  cursor: pointer;
  margin: 0 4px 12px 0;
  @media screen and (max-width: 360px) {
    width: 126px;
    height: 100px;
    border-radius: 100px;
  }
`;

const Circle = styled.img`
  width: 118px;
  height: 118px;
  border-radius: 120px;
  margin: 0 0 12px 0;
  @media screen and (max-width: 360px) {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin: 0 0 12px 0;
  }

  &.on {
    border: 5px solid #f1134e;
    transition: all 300ms ease-in;
  }
`;

const PlayButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: #f1134e;
  border: none;
  position: relative;
  right: 30px;
  top: 80px;
  @media screen and (max-width: 360px) {
    width: 26px;
    height: 26px;
    border-radius: 28px;
    margin: 0 0 16px 0;
    position: relative;
    right: 25px;
    top: 70px;
  }

  .pause-btn {
    color: white;
    align-items: center;
    text-align: center;
    font-size: 30px;
    margin-top: 1px;
    margin-left: 1px;
    margin-right: 0px;
    @media screen and (max-width: 361px) {
      font-size: 28px;
      margin-top: 0px;
      margin-left: 0px;
      margin-right: 1px;
    }
  }
`;

const Title = styled.div`
  font-size: 13px;
  margin: 0 0 2px 0;
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;

  @media screen and (max-width: 360px) {
    font-size: 12px;
    margin: 0 0 2px 0;
    overflow: hidden;
  }
`;

export default React.memo(PlayBox);

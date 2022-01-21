import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdOutlineMoreVert } from "react-icons/md";
import { actionCreators as chatListActions } from "../../redux/modules/chatList";
import RoomModal from "./RoomModal";

const RoomHeader = ({ createRoomId }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const another_nick = useSelector(
    (state) => state?.chatList?.chat_list[0]?.qUserId?.nickname
  );
  const userId = createRoomId()?.uid;

  useEffect(() => {
    dispatch(chatListActions.setChatBlockData(userId));
  }, []);

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
      <RoomModal open={modalOpen} close={closeModal} />
      <ChatHeader>
        <FlexSearchBar>
          <div>
            <RiArrowLeftSLine
              onClick={() => {
                history.goBack();
              }}
              size="30px"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <Name>{another_nick}</Name>
          </div>
          <div>
            <MdOutlineMoreVert
              size="20px"
              style={{ cursor: "pointer" }}
              onClick={() => {
                openModal();
              }}
            />
          </div>
        </FlexSearchBar>
      </ChatHeader>
    </>
  );
};

const ChatHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const FlexSearchBar = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  background: black;
  max-width: 425px;
  width: 100%;
  margin: 0 auto;
  height: 60px;
  position: relative;
  padding-top: 20px;
`;
const Name = styled.h1`
  font-size: 16px;
`;

export default RoomHeader;

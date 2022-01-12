import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdOutlineMoreVert } from "react-icons/md";
import RoomModal from "./RoomModal";

const RoomHeader = (props) => {
  const { topMenu } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflowY = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflowY = "scroll";
  };

  if (topMenu) {
    return (
      <>
        <RoomModal props={props} open={modalOpen} close={closeModal} />
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
            <Name>조은영</Name>
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
      </>
    );
  }
};

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

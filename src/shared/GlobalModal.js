import React, { useState } from "react";
import styled from "styled-components";
import Container from "../elements/Container";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { ImShare } from "react-icons/im";

const MenuModal = (props) => {
  return (
    <>
      <Section>
        <Container>
          <div
            style={{
              display: "block",
              textAlign: "end",
              verticalAlign: "center",
            }}
          >
            <ImShare style={{ cursor: "pointer" }} size="20px" />
            <AiOutlineClose
              style={{
                margin: "13px 0px 0px 10px",

                cursor: "pointer",
              }}
              size="20px"
              color="white"
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <ImageCircle />
          </div>

          <Title></Title>

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
            ></div>
            <div
              style={{
                display: "flex",
                marginBottom: "2px",
                lineHeight: "80%",
              }}
            >
              <Text></Text>
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
          ></div>
        </Container>
      </Section>
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
export default MenuModal;

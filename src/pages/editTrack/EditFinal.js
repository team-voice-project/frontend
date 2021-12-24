import React from "react";
import styled from "styled-components";
import { Container } from "../../elements";

const EditFinal = () => {
  return (
    <EditWrap>
      <Container padding={"0"}>
        <nav className={"edit-header"}>
          <button type={"button"}>뒤로가기</button>
          <button type={"button"}>다음</button>
        </nav>
      </Container>

      <Container padding={"0px"}>
        <div className={"progress-bar"}>
          <div className={"progress-bar-content"} />
        </div>
      </Container>

      <Container padding={"20px"}>
        <div className={"edit-body"}>
          <strong className={"title"}>업로드하기</strong>

          <div className={"emoticon-box"}>
            <div className={"sub-title"}>이모티콘</div>
            <ul className={"emoticon-list"}>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
              <li className={"emoticon-item"}></li>
            </ul>
          </div>

          <div className={"guide-text"}>
            작성을 완료하고
            <br />
            마이페이지에서 내 목소리를 확인해보세요!
          </div>
        </div>

        <button type={"button"} className={"upload-btn"}>
          업로드하기
        </button>
      </Container>
    </EditWrap>
  );
};

export default EditFinal;

const EditWrap = styled.section`
  .edit-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 8px 20px;
  }

  .progress-bar {
    height: 2px;
    background-color: #ccc;

    .progress-bar-content {
      width: 100%;
      height: inherit;
      background-color: var(--point-color);
    }
  }

  .edit-body {
    .title {
      display: block;
      margin-bottom: 30px;
    }
  }

  .emoticon-box {
    margin-bottom: 40px;

    .sub-title {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }

  .emoticon-list {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;

    .emoticon-item {
      border-radius: 50%;
      margin: 7.5px;
      flex: 0 1 calc(33.33% - 15px);
      padding-bottom: 29%;
      background: #2c2b2b;
    }
  }

  .guide-text {
    text-align: center;
    line-height: 1.82;
    font-size: 12px;
    margin-bottom: 60px;
  }

  .upload-btn {
    width: 100%;
    padding: 10px;
    border: 0;
    color: #fff;
    height: 56px;
    font-weight: bold;
    font-size: 17px;
    border-radius: 6px;
    background-color: var(--point-color);
  }
`;

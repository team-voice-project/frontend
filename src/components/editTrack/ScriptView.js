import React from "react";
import styled from "styled-components";

import { Container } from "../../elements";

const ScriptView = ({ script_text }) => {
  return (
    <ViewWrap>
      <Container>
        <div className={"view-content"}>
          <strong className={"title"}>기본 설정하기</strong>
          <div className={"script-text"}>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda autem, cum excepturi facilis iste iusto minima, nulla
              omnis quibusdam repudiandae tempora ullam, unde. Adipisci commodi
              eos, odit tenetur ullam veniam.
            </div>
            <div>
              Assumenda at, consequuntur culpa dignissimos dolorum ducimus
              facere facilis fugit harum hic illo inventore, iste laboriosam
              maiores nam neque obcaecati officia qui quod saepe sit suscipit
              ullam vero vitae voluptate.
            </div>
            <div>
              Accusamus animi corporis iure nobis praesentium, quas sed sunt.
              Animi, commodi cumque error est facere minima molestiae nesciunt
              nostrum quas qui quis, rerum saepe sed sequi sit sunt temporibus
              voluptatibus?
            </div>
            <div>
              Aliquam, amet deleniti ea, exercitationem harum id illum ipsum
              laudantium necessitatibus porro, suscipit vel velit voluptatem.
              Accusantium alias deleniti ducimus esse explicabo nesciunt qui
              quidem quisquam sit ut? Atque, quasi.
            </div>
            <div>
              Delectus dignissimos fuga magnam neque rem sunt vero! Ab assumenda
              debitis labore nam sed similique tempore? Ad doloremque et eveniet
              inventore libero, molestias neque nisi placeat saepe similique
              tempore veniam. Delectus dignissimos fuga magnam neque rem sunt
              vero! Ab assumenda debitis labore nam sed similique tempore? Ad
              doloremque et eveniet inventore libero, molestias neque nisi
              placeat saepe similique tempore veniam. Delectus dignissimos fuga
              magnam neque rem sunt vero! Ab assumenda debitis labore nam sed
              similique tempore? Ad doloremque et eveniet inventore libero,
              molestias neque nisi placeat saepe similique tempore veniam.
              Delectus dignissimos fuga magnam neque rem sunt vero! Ab assumenda
              debitis labore nam sed similique tempore? Ad doloremque et eveniet
              inventore libero, molestias neque nisi placeat saepe similique
              tempore veniam. Delectus dignissimos fuga magnam neque rem sunt
              vero! Ab assumenda debitis labore nam sed similique tempore? Ad
              doloremque et eveniet inventore libero, molestias neque nisi
              placeat saepe similique tempore veniam. Delectus dignissimos fuga
              magnam neque rem sunt vero! Ab assumenda debitis labore nam sed
              similique tempore? Ad doloremque et eveniet inventore libero,
              molestias neque nisi placeat saepe similique tempore veniam.
              Delectus dignissimos fuga magnam neque rem sunt vero! Ab assumenda
              debitis labore nam sed similique tempore? Ad doloremque et eveniet
              inventore libero, molestias neque nisi placeat saepe similique
              tempore veniam. Delectus dignissimos fuga magnam neque rem sunt
              vero! Ab assumenda debitis labore nam sed similique tempore? Ad
              doloremque et eveniet inventore libero, molestias neque nisi
              placeat saepe similique tempore veniam. Delectus dignissimos fuga
              magnam neque rem sunt vero! Ab assumenda debitis labore nam sed
              similique tempore? Ad doloremque et eveniet inventore libero,
              molestias neque nisi placeat saepe similique tempore veniam.
              Delectus dignissimos fuga magnam neque rem sunt vero! Ab assumenda
              debitis labore nam sed similique tempore? Ad doloremque et eveniet
              inventore libero, molestias neque nisi placeat saepe similique
              tempore veniam. Delectus dignissimos fuga magnam neque rem sunt
              vero! Ab assumenda debitis labore nam sed similique tempore? Ad
              doloremque et eveniet inventore libero, molestias neque nisi
              placeat saepe similique tempore veniam.
            </div>
          </div>
        </div>
      </Container>
    </ViewWrap>
  );
};

export default ScriptView;

const ViewWrap = styled.div`
  padding-top: 42px;

  .view-content {
    padding-top: 20px;

    .title {
      display: block;
      margin-bottom: 20px;
    }

    .script-text {
      font-size: 15px;
      overflow-y: auto;
      height: calc(60vh - 62px);
    }
  }
`;

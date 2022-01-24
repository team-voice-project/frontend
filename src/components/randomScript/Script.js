import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as trackActions } from "../../redux/modules/editTrack";
import { Font } from "../../elements";

const Script = (props) => {
  const free_cover = [];
  const asmr = [
    "예시) 과자 등을 먹는 소리를 녹음해보세요.",
    "예시) 요리하는 소리를 녹음해보세요.",
    "예시) 글씨쓰는 소리를 녹음해보세요.",
  ];
  const healing = [
    "예시) 열심히 노력하다가 갑자기 나태해지고 잘참다가 조급해지고 희망에 부풀었다가 절망에 빠지는 일을 또 다시 반복하고 있다. 그래도 계속해서 노력하면 수채화를 더 잘 이해할 수 있겠지. 그게 쉬운 일이었다면, 그 속에서 아무런 즐거움도 얻을 수 없었을 것이다. 그러니 계속해서 그림을 그려야겠다. -빈센트 반고흐",
    "예시) 인간사에는 안정된 것이 하나도 없음을 기억하라. 성공에 들뜨거나 역경에 지나치게 의기소침하지 마라 -소크라테스",
    "예시) 다른 사람이 무엇을 하는지 신경쓰지 말라. 더 나은 당신이 되기 위해노력하고 매일 당신의 기록을깨뜨려라 -윌리엄 보엣커",
  ];
  const song = [
    "예시) 아이유-strawberry moon 를 따라 불러보세요! 달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴 팽팽한 어둠 사이로 떠오르는 기분이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란 strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh-oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더 완벽해 ooh",
    "예시) 회전목마 (Feat. Zion.T, 원슈타인) (Prod. Slom)-sokodomo 를 따라 불러보세요! 내가 슬플 때마다 이 노래가 찾아와 세상이 둥근 것처럼 우린 동글동글 인생은 회전목마 우린 매일 달려가 언제쯤 끝나 난 잘 몰라 어머, 벌써 정신없이 달려왔어 Speed up 어제로 돌아가는 시곌 보다가 어려워 어른이 되어가는 과정이 Uh huh On the road, 24 시간이 아까워 Uh huh Big noise, Everything brand new 어렸을 때처럼 바뀌지 않는 걸 찾아 나섰단 말야 왜냐면 그때가 더 좋았어 난 So let me go back 타임머신 타고 I'll go back 승호가 좋았을 때처럼만 내가 슬플 때마다 이 노래가 찾아와 세상이 둥근 것처럼 우리 인생은 회전목마 우린 매일 달려가 언제쯤 끝나 난 잘 몰라 빙빙 돌아가는 회전목마처럼 영원히 계속될 것처럼 빙빙 돌아올 우리의 시간처럼 인생은 회전목마",
    " 예시) 장범준-흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야 를 따라 불러보세요! 흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야 스쳐지나간건가 뒤돌아보지만 그냥 사람들만 보이는거야 다와가는 집근처에서 괜히 핸드폰만 만지는거야 한번 연락해 볼까 용기내 보지만 그냥 내 마음만 아쉬운 거야 걷다가 보면 항상 이렇게 너를 바라만 보던 너를 기다린다고 말할까 지금 집앞에 계속 이렇게 너를 아쉬워 하다 너를 연락했다 할까",
  ];
  const foreign = [
    "예시) Growing up means adapting. Puzzling out your world and your place. 나이가 든다는 건 적응한다는 뜻이야. 너의 세상에 대해 생각하며 답을 알아가는 거지.",
    "예시) If you don't know where you want to go, then it doesn't matter which path you take. 어디로 가고 싶은지 모른다는 건, 어떤 길이든 선택할 수 있단 거야.",
    "예시) Don't need to run so fast. Sometimes we come last but we did our best. 너무 빠륵 달릴 필요 없어. 때로 마지막에 들어왔을지라도 최선을 다 했으니까.",
  ];
  const narration = [
    "예시) 그날은 바람 한 점 없었습니다. 하늘도, 바다도, 어둠에 잠겨있었죠. 뜨거운 용암이 하늘 위로 솟구쳤습니다. 한참을 흐르고 흘러 바다는 땅이 되고 산이 되고, 오름이 됐습니다. 섬은 그렇게 시작됐습니다. 삶도 섬의 운명을 비켜가지 못했습니다. 평생 모진 바다 밭을, 거친 돌밭을 일구고 또 일궈야 했죠. 섬에 뿌리내린 삶과 자연. 때로는 서로를 보듬고 낮추며, 때로는 버티며 함께 섬을 만들었습니다.고되지만 눈부신 땅. 이곳은 색다른 섬, 제주입니다.",
    "예시) 외래어로 착각하는 진짜 우리말들, 알려드릴게요. '헹가래, 에누리' 어감이 왠지 우리말이 아닌 것 같죠. 그런데 순우리말이에요. 예전에 땅을 고를  때 흙을 파는 기구인 '가래'를 이용해 여러 명이 힘을 합쳐서 가래질을 했어요. 작업 전에 호흡이 잘 맞는지 땅을 파는 시늉을 해보는 데 이걸 '헛가래'라고 해요. 여기서 유래된 말이 '헹가래'. 그리고 '에누리'도 일본어로 알고 계신 분들 많으셨죠. 값을 더 보태거나 깎는 것을 뜻하는 순우리말입니다. 흔히 일본식 한자어인 '할인'이나, 영어 '세일'이라는 말을 많이 쓰는데 '에누리'라는 말을 사용하는 게 더 좋겠죠? '헹가래, 에누리' 외래어가 아니고 순우리말이라는 것 기억하세요.",
    "예시) 음식을 씹을 때 통증을 느끼거나, 잇몸이 붓고, 시리고, 또 피가 나는 증상을 겪어보셨나요? 흔히 풍치라 부르는 치주 질환은 잇몸에 생기는 질환입니다. 우리 잇몸은 치아 아래에 붉게 보이는 치은, 또 치아를 둘러싼 치주인대와 치조골 등으로 이뤄져 있습니다. 음식을 먹으면 미세한 음식 찌꺼기들이 세균과 섞여서 치아와 잇몸 사이에 남게 되는데요. 이를 치태라 부릅니다. 치태가 오랜 기간 지속적으로 쌓이면 단단한 치석으로 변하고, 잇몸에 염증을 유발하게 됩니다. 이로 인해 치아를 감싸고 있던 잇몸과 또 잇몸뼈가 녹아내리고, 심각한 경우에는 치아를 잃을 수 있습니다. 소리 없이 진행돼 치아를 앗아가는 치주 질환. 입속에서 과연 어떤 일이 벌어지고 있는지 알아보겠습니다.",
  ];
  const imitate = [
    "예시) 최준을 따라해보세요! 철이없었죠 커피가 좋아서 유학을 했다는 자체가",
    "예시) 오징어 게임의 등장인물 '오일남'을 따라해보세요! 우선 제일 앞에 선 사람이 중요해. 그 사람은 상대편의 얼굴을가장 가까이서 마주 보는 사람이고나머지 팀원들이 모두 그의 뒷모습을 보는 사람이니까 그 사람이 약해보이거나 기가 꺾여보이면 그땐 이미 승부는 끝난거야. 그리고 제일 뒤에는 마치 배의 닻처럼 듬직한 사람이 맡아 줘야 돼. 그리고 사람을 배치하는게 중요한데 줄을 사이에 놓고 한명씩 오른쪽, 왼쪽으로 나눠서 서는거야. 두 발은 11자로 똑바로 놔. 줄은 겨드랑이 사이에 끼고, 그래야 힘을 제대로 받을 수가 있어. 마지막으로 이게 제일 중요한건데 신호가 울리고 처음 10초는 그냥 버티는거야. 이때 자세는 눕는 자세. 아랫배를 하늘로 쭉 밀어 올리고, 머리는 뒷사람의 사타구니를 볼 수 있을정도로 힘껏 젖혀 그러면은 웬만해서는 안 끌려가 그렇게 10초만 버티면은 '씁, 이상하다, 왜 안끌려오지?' 하고 상대편이 당황할거야 분명 자기네들이 더 셀 거라고 믿었을 테니까 그렇게 버티다 보면 상태편의 호흡이 깨지는 순간이 분명히 올거야",
    "예시) 베테랑의 등장인물 조태오를 따라해보세요! 기사님 맷돌 손잡이 알아요? 맷돌 손잡이를 어이라 그래요, 어이. 맷돌에 뭘 갈려고 집어넣고 맷돌을 돌리려고 하는데 손잡이가 빠졌네 이런 상황을 어이가 없다 그래요. 황당하잖아 아무것도 아닌 손잡이 때문에 해야 될 일을 못 하니까 지금 내 기분이 그래 어이가 없네",
  ];
  const in_word = [
    "예시) 킹리적 갓심: '합리적 의심'을 더욱 강조해서 누가 봐도 의심이 되는 상황, 증거가 뚜렷한 상황을 표현하는 단어입니다.",
    "예시) 쫌쫌따리: 뼈닭발에 붙어있는 적은 양의 살을 표현할 때 나온 말로, 조금씩/작다는 의미를 가지고 있습니다.",
    "예시) 2000원 비싸짐: 팩트폭행을 당했을 때 '뼈를 맞았다'는 표현을 사용합니다. 뼈를 맞았다 에서 뼈가 없어져 순살이 되다가 되었는데, 일반 치킨보다 순살은 2000원 비싸다는 것을 응용한 표현입니다.",
  ];
  const sound_effect = [];

  const dispatch = useDispatch(trackActions.saveBase());
  const category = useSelector((state) => state.editTrack.category);

  useEffect(() => {
    dispatch();
  }, []);

  const randomData = () => {
    if (category === "자유주제") {
      return null;
    }
    if (category === "ASMR") {
      const random = Math.floor(Math.random() * asmr.length);
      return asmr[random];
    }
    if (category === "힐링응원") {
      const random = Math.floor(Math.random() * healing.length);
      return healing[random];
    }
    if (category === "노래") {
      const random = Math.floor(Math.random() * song.length);
      return song[random];
    }
    if (category === "외국어") {
      const random = Math.floor(Math.random() * foreign.length);
      return foreign[random];
    }
    if (category === "나레이션") {
      const random = Math.floor(Math.random() * narration.length);
      return narration[random];
    }
    if (category === "성대모사") {
      const random = Math.floor(Math.random() * imitate.length);
      return imitate[random];
    }
    if (category === "유행어") {
      const random = Math.floor(Math.random() * in_word.length);
      return in_word[random];
    }
    if (category === "효과음") {
      return null;
    }
  };
  const random_script = randomData();

  return (
    <>
      <div>
        <Font fontSize="12px" margin="0px 0px 20px 0px" color="#AEAEAE">
          {randomData()}
        </Font>
      </div>
    </>
  );
};

export default Script;

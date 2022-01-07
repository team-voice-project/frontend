// 카카오 소셜 공유 이벤트 초기화 동작
export const createKakaoButton = (track_data) => {
  // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
  if (window.Kakao) {
    const kakao = window.Kakao;

    // 중복 initialization 방지
    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    }

    kakao.Link.createDefaultButton({
      // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
      container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: track_data?.title,
        description:
          "#" + track_data?.TrackTags.map((item) => item.tag).join(" #"),
        imageUrl: track_data?.TrackThumbnail.trackThumbnailUrlFull, // i.e. process.env.FETCH_URL + '/logo.png'
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "목소리 듣기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }
};

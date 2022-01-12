// 허용 가능한 음원 파일 타입 리스트
export const AUDIO_TYPE_LIST = [
  "audio/basic",
  "audio/L24",
  "audio/mid",
  "audio/mpeg",
  "audio/mp4",
  "audio/x-aiff",
  "audio/x-mpegurl",
  "audio/vnd.rn-realaudio",
  "audio/ogg",
  "audio/vorbis",
  "audio/vnd.wav",
  "audio/wav",
  "audio/x-m4a",
  "audio/webm",
];

// 글로벌 뮤직플레이어 숨김 페이지 리스트
export const GLOBAL_PLAYER_ESCAPE_LIST = [
  "/edit/base",
  "/edit/record",
  "/edit/final",
  "/login",
  "/edit/profile",
  "/share/",
  "/chat",
  "/chatroom",
];

export const PLAY_LIST_KEY = "OAO::playlist";

// 세션스토리지 플레이리스트 관련
export const getSessionPlaylist = () => {
  const data = sessionStorage.getItem(PLAY_LIST_KEY);
  return JSON.parse(data);
};

export const setSessionPlaylist = (playlist) => {
  sessionStorage.setItem(PLAY_LIST_KEY, JSON.stringify(playlist));
};

export const clearSessionPlaylist = () => {
  sessionStorage.removeItem(PLAY_LIST_KEY);
};

// 기본 프로필 경로
export const DEFAULT_PROFILE_URL = "/assets/images/default_profile.png";

export const byteToMegaByte = (byte) => {
  return Math.round((byte / 1024 / 1024) * 100) / 100;
};

export const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

export const autoHeightArea = (e) => {
  e.currentTarget.style.height = "0";
  e.currentTarget.style.height = 12 + e.currentTarget.scrollHeight + "px";
  window.scrollTo(0, document.documentElement.clientHeight);
};

export const nickValidCheck = (nick) => {
  const kor_en_length_valid = /^[a-zA-Z가-힣0-9]{4,15}$/.test(nick);
  if (kor_en_length_valid) {
    return {
      passed: true,
    };
  } else {
    return {
      passed: false,
      msg: "영문/한글 4글자 ~ 15글자 조건이 맞지 않습니다.",
    };
  }
};

export const emailValidCheck = (email) => {
  const valid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(email);
  if (valid) {
    return {
      passed: true,
    };
  } else {
    return {
      passed: false,
      msg: "잘못된 이메일 형식입니다.",
    };
  }
};

export const convertAudio = (audioFileData, targetFormat) => {
  try {
    targetFormat = targetFormat.toLowerCase();
    let reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = function (event) {
        let contentType = "audio/" + targetFormat;
        let data = event.target.result.split(",");
        let b64Data = data[1];
        let blob = getBlobFromBase64Data(b64Data, contentType);
        let blobUrl = URL.createObjectURL(blob);

        let convertedAudio = {
          name: audioFileData.name.substring(
            0,
            audioFileData.name.lastIndexOf(".")
          ),
          format: targetFormat,
          data: blobUrl,
          file: blob,
        };
        // console.log("convertedImage: ", convertedImage);
        resolve(convertedAudio);
      };
      reader.readAsDataURL(audioFileData);
    });
  } catch (e) {
    console.log("Error occurred while converting : ", e);
  }
};

function getBlobFromBase64Data(b64Data, contentType, sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

export const autoHeightArea = (e) => {
  e.currentTarget.style.height = "0";
  e.currentTarget.style.height = 12 + e.currentTarget.scrollHeight + "px";
  window.scrollTo(0, document.documentElement.clientHeight);
};

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

export const byteToMegaByte = (byte) => {
  return Math.round((byte / 1024 / 1024) * 100) / 100;
};

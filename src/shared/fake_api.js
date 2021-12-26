import axios from "axios";

// ******** Axios 인스턴스 생성 ******** //

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json",
  },
});

// ******** Interceptor를 통한 Header 설정 ******** //

api.interceptors.request.use((config) => {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

// ******** Export api ******** //

export const apis = {
  register: () => api.post("/api/auth/register"),
  changeNickname: (nickname) => api.post("/api/auth/nickname", nickname),
  checkUser: () => api.get("/api/auth/me"),
  editProfileImage: (userId, profileImage) =>
    api.post(`/api/auth/${userId}`, { profileImage: "" }),
  trackUpload: (tracks) => api.post("/api/tracks", tracks),
  //
  trackDelete: (trackID) => api.post(`/api/tracks/${trackID}`),
  likeTrack: (trackId, like) => api.post(`/api/tracks/${trackId}/like`, like),

  myPage: (userId, userInfo, myTracks, likeTracks) =>
    api.get(`/api/common/user/${userId}`, userInfo, myTracks, likeTracks),
  detailTrack: (trackId, track, comments) =>
    api.get(`/api/common/track/${trackId}`, track, comments),
  mainPage: (tracks) => api.get("/api/common", tracks),

  category: () =>
    api.get(
      "/api/common/search?category=category&tag1=tag1&tag2=tag2&tag3=tag3"
    ),
  search: () => api.get("api/search?keyword=keyword"),

  commentTrack: (trackId, comment) =>
    api.post(`/api/tracks/${trackId}/comment`, comment),
  editComment: (trackId, commentId, comment) =>
    api.put(`/api/tracks/${trackId}/comment/${commentId}`, comment),
  deleteComment: (tracksId, commentId) =>
    api.delete(`/api/tracks/${tracksId}/comment/${commentId}`),
};

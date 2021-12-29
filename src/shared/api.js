import axios from "axios";
import { getCookie } from "./Cookie";

// ******** Axios 인스턴스 생성 ******** //

const api = axios.create({
  baseURL: "http://54.180.82.210",
  headers: {
    authorization: "Bearer " + getCookie(),
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json",
  },
});

// ******** Export api ******** //
export const apis = {
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

  mainPage: () => api.get("/api/common"),

  category: () =>
    api.get(
      "/api/common/search?category=category&tag1=tag1&tag2=tag2&tag3=tag3"
    ),
  search: (keyword) => api.get(`api/search?keyword=${keyword}`),

  commentTrack: (trackId, comment) =>
    api.post(`/api/tracks/${trackId}/comment`, comment),
  editComment: (trackId, commentId, comment) =>
    api.put(`/api/tracks/${trackId}/comment/${commentId}`, comment),
  deleteComment: (tracksId, commentId) =>
    api.delete(`/api/tracks/${tracksId}/comment/${commentId}`),

  categoryList: () => api.get(`/api/listinfo`),
};

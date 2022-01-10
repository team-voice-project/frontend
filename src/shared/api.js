import axios from "axios";
import { getCookie } from "./Cookie";
import { history } from "../redux/configStore";

// API 인스턴스 생성
const api = axios.create({
  baseURL: `http://15.165.160.158`,

  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json",
  },
});

// 토큰정보 인터셉트
api.interceptors.request.use((config) => {
  config.headers.common["authorization"] = `Bearer ${getCookie()}`;
  return config;
});

// API 호출 에러 발생 시 에러 핸들링 페이지로 연결
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const code = error.response.status;
    if (error.response.data === "사용중인 닉네임입니다") {
      // 프로필 수정 시 이미 존재하는 닉네임으로 수정 할 경우 예외처리
      alert(error.response.data);
      return;
    } else {
      return history.push(`/error/${code}`);
    }
  }
);

// export api list
export const apis = {
  changeNickname: (nickname) => api.post("/api/auth/nickname", nickname),
  editProfileImage: (userId, profileImage) =>
    api.post(`/api/auth/${userId}`, { profileImage: "" }),
  trackUpload: (tracks) => api.post("/api/tracks", tracks),
  //
  trackDelete: (trackId) => api.delete(`/api/tracks/${trackId}`),
  likeTrack: (trackId, like) => api.post(`/api/tracks/${trackId}/like`, like),

  myPage: (userId, userInfo, myTracks, likeTracks) =>
    api.get(`/api/common/user/${userId}`, userInfo, myTracks, likeTracks),
  detailTrack: (trackId, track, comments) =>
    api.get(`/api/common/track/${trackId}`, track, comments),

  mainPage: () => api.get("/api/common"),

  category: (category, tag1, tag2, tag3) =>
    api.get(
      `/api/common/search?category=${category}&tag1=${tag1}&tag2=${tag2}&tag3=${tag3}`
    ),
  search: (keyword) => api.get(`api/search?keyword=${keyword}`),

  commentTrack: (trackId, comment) =>
    api.post(`/api/tracks/${trackId}/comment`, { comment }),
  editComment: (trackId, commentId, comment) =>
    api.put(`/api/tracks/${trackId}/comment/${commentId}`, comment),
  deleteComment: (trackId, commentId) =>
    api.delete(`/api/tracks/${trackId}/comment/${commentId}`),

  // 프로필 조회 API
  getProfile: () => api.get("/api/auth/me"),

  // 프로필 변경 API
  editProfile: (profile) => api.post("api/auth/profile", profile),

  // 트랙 업로드 관련 API
  uploadTrack: (track) => api.post(`/api/tracks`, track),
  updateTrack: (id, track) => api.put(`/api/tracks/${id}`, track),

  // 플레이리스트 관련 API
  getPlayList: () => api.get(`/api/playlist`),
  savePlayList: (play_id_list) =>
    api.post(`/api/playlist`, { trackId: play_id_list }),

  // 공통 API
  getMenuInfoDB: () => api.get("/api/tracks/listinfo"),
  getTrackInfoDB: (id) => api.get(`/api/tracks/${id}`),
};

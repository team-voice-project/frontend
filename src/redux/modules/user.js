import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

//middleware

const registerGoogleDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .google() //유저가 입력한 유저정보를 api로 넘겨줘야함
      .then((res) => {
        //완료되면 res가 넘어오고
        console.log(res);
      })
      .catch((err) => {
        //오류나면 이리로
        console.log(err);
      });
  };
};

const registerNaverDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .naver() //유저가 입력한 유저정보를 api로 넘겨줘야함
      .then((res) => {
        //완료되면 res가 넘어오고
        console.log(res);
      })
      .catch((err) => {
        //오류나면 이리로
        console.log(err);
      });
  };
};

const registerKakaoDB = () => {
  return function (dispatch, getState, { history }) {
    window.location.href = "http://54.180.82.210/api/auth/kakao";
    // apis
    //   .kakao() //유저가 입력한 유저정보를 api로 넘겨줘야함
    //   .then((res) => {
    //     //완료되면 res가 넘어오고
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     //오류나면 이리로
    //     console.log(err);
    //   });
  };
};

// const logInDB = (email, password) => {
//   return function (dispatch, getState, { history }) {
//     console.log(email);
//     console.log(password);
//     apis
//       .login(email, password)
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//         setCookie("token", res.data.token, 3);
//         localStorage.setItem("id", res.data.user.id);
//         localStorage.setItem("nickname", res.data.user.nickname);
//         dispatch(
//           setUser({ email: email.email, nickname: res.data.user.nickname })
//         );
//         history.replace("/");
//       })
//       .catch((err) => {
//         console.log(err);
//         window.alert(
//           "잘못된 아이디나 비밀번호 입니다. 다시 확인해주세요!(*⁰▿⁰*)"
//         );
//       });
//   };
// };

// const logOutDB = () => {
//   return function (dispatch, getState, { history }) {
//     deleteCookie("token");
//     localStorage.removeItem("id");
//     localStorage.removeItem("nickname");
//     dispatch(logOut());
//     // .then(() => {
//     history.replace("/");
//     // })
//     // .catch((err) => {
//     //   console.log(err)
//     // })

//     window.location.reload();
//   };
// };

// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     const userId = localStorage.getItem("id");
//     const tokenCheck = document.cookie;
//     if (tokenCheck) {
//       dispatch(setUser({ userId: userId }));
//     } else {
//       dispatch(logOut());
//     }
//   };
// };

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user.user;
        draft.is_login = action.payload.user.is_login;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  getUser,
  registerGoogleDB,
  registerNaverDB,
  registerKakaoDB,
};

export { actionCreators };

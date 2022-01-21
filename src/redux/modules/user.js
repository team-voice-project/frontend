import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import { deleteCookie } from "../../shared/Cookie";

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
    window.location.href = `${process.env.REACT_APP_TEST_API_URL}/api/auth/kakao`;
  };
};

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut(deleteCookie("OAO")));
    history.push("/");
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user.user;
        draft.is_login = action.payload.user.is_login;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = "";
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  getUser,
  logOutDB,
  registerGoogleDB,
  registerNaverDB,
  registerKakaoDB,
};

export { actionCreators };

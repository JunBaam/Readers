//JWT Token 공유할수있는 저장소
import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "./utils/UseLocalStorage";
// Reducer 함수가 사이드이펙트를 사용할수있게 해주는 라이브러리(useReducer대신사용)
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  //Update,
} from "use-reducer-with-side-effects";

//context 생성
const AppContext = createContext();

//reducer는 기본적으로 순수함수 http 통신 등 사이트이펙트 적용 x
const reducer = (prevState, action) => {
  const { type } = action;

  //type이 SET_TOKEN 이면 jwtoken으로 새로운상태값을 만들고 store에 저장한다.
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = { ...prevState, jwtToken, isAuthenticated: true };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken);
    });
  } else if (type === DELETE_TOKEN) {
    const newState = { ...prevState, jwtToken: "", isAuthenticated: false };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
    });
  }

  return prevState;
};

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");

  //useReducer : 상태를 관리하는 로직을 컴포넌트 바깥 및 다른 파일에서 사용할수있다.
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    //실제 값을 읽어옴
    jwtToken,
    isAuthenticated: jwtToken.length > 0,
  });

  return (
    //Provider 선언시 , value 에 선언된 부분들은 props로 넘겨주지 안항도 사용가능!
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

//Action
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Action Creators (실제 노출되는 action)
//setToken에서 token 값을 받으면 객체생성
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });

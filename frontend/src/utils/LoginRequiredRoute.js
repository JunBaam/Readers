import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../store";
import { notification } from "antd";
import { MehOutlined } from "@ant-design/icons";

//토큰의 길이가 0보다크다면 로그인한걸로 인식

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  //console.log("권한", isAuthenticated);

  if (isAuthenticated) {
  } else {
  }

  return (
    <Route
      {...kwargs}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          notification.open({
            message: "로그인이 필요한 페이지입니다!",
            icon: <MehOutlined style={{ color: "#FAAD14" }} />,
          });
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

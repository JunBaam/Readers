import React, { useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { useHistory, Link, useLocation } from "react-router-dom";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import "./Login.css";
//import useLocalStorage from "../../utils/useLocalStorage";
import { setToken, useAppContext } from "../../store";

function Login() {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  //const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [fieldErrors, setFieldErrors] = useState({});
  // location.state거 있으면 location 으로
  //location.state가 없으면  home 으로 .
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = values => {
    async function fn() {
      const { email, username, password } = values;
      const data = { email, password };

      setFieldErrors({});

      try {
        const response = await Axios.post(
          "http://15.165.223.171:8080/accounts/login/",
          data
        );

        console.log("login_response", response);
        //response.data에서 token , username 를 꺼냄
        const {
          data: { token: jwtToken, username: login_user, pk: login_pk },
        } = response;

        localStorage.setItem("username", login_user);
        localStorage.setItem("pk", login_pk);
        //저장
        dispatch(setToken(jwtToken));

        notification.open({
          message: "환영합니다!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          console.log(error.response);
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  //Ant에 존재하는 값
                  validateStatus: "error",
                  help: errors,
                };
                //console.log(acc);
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };
  return (
    <div className="login_form">
      <Card
        title="로그인"
        // style={{ width: 600 }}
      >
        <Form
          style={{ color: "red" }}
          {...layout}
          onFinish={onFinish}

          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            label={<label style={{ color: "white" }}>이메일</label>}
            rules={[
              {
                required: true,
                message: "이메일을 작성해주세요!",
              },
              {
                type: "email",
                message: "잘못된 이메일형식입니다!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="이메일 주소 입력" />
          </Form.Item>

          <Form.Item
            label={<label style={{ color: "white" }}>비밀번호</label>}
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "비밀번호를 작성해주세요!",
              },
              {
                min: 8,
                message: "8글자이상 입력해주세요!",
              },
            ]}
          >
            <Input.Password placeholder="비밀번호 입력" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <div className="from_input_signup">
              계정이 없으신가요? <br />
              <Link to="/signup" className="from_input_signup">
                리더스 가입하기
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

//ant d
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default Login;

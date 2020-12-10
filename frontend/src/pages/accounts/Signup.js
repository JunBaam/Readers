import React, { useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { useHistory, Link } from "react-router-dom";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import "./Signup.css";

function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = values => {
    async function fn() {
      const { email, username, password } = values;
      const data = { email, username, password };

      setFieldErrors({});

      try {
        await Axios.post("http://15.165.223.171:8080/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        history.push("/login");
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
    <div className="sign_up_form">
      <Card title="회원가입">
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
            {...fieldErrors.email}
          >
            <Input placeholder="이메일 주소 입력" />
          </Form.Item>

          <Form.Item
            label={<label style={{ color: "white" }}>아이디</label>}
            name="username"
            rules={[
              {
                required: true,
                message: "아이디를 작성해주세요!",
              },
              {
                min: 3,
                message: "3글자이상 입력해주세요!",
              },
            ]}
            hasFeedback
            {...fieldErrors.username}
          >
            <Input placeholder="아이디 입력" />
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

          <Form.Item
            name="confirm"
            label={<label style={{ color: "white" }}>비밀번호 확인</label>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject("비밀번호가 일치하지 않습니다!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인 입력" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
            <div className="from_input_login">
              이미 계정이 있으신가요? <br />
              <Link to="/login" className="from_input_signup">
                기존 계정으로 로그인하기
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

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

export default Signup;

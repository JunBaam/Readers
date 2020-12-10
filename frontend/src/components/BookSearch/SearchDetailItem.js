import React from "react";
import { Form, Input, Button, Radio, notification, Rate } from "antd";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../store";

function SearchDetailItem(props) {
  // Antd 레이아웃
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 3, span: 16 },
  };
  //카테고리 목록
  const plainOptions = [
    "대학교재",
    "만화",
    "초등/유아",
    "잡지",
    "컴퓨터/IT",
    "여행",
    "취업/수험",
    "과학",
    "외국어",
    "기술/공학",
    "종교",
    "역사/문화",
    "정치/사회",
    "자기계발",
    "경제/경영",
    "건강",
    "요리",
    "가정/육아",
    "인문",
    "시/에세이",
    "소설",
    "중/고등참고서",
    "예술/대중문화",
    "취미/실용/스포츠",
  ];

  //별점표기
  const desc = ["1점", "2점", "3점", "4점", "5점"];

  const history = useHistory();

  const {
    store: { jwtToken },
  } = useAppContext();

  // 작성하기버튼  클릭시 실행
  const handleFinish = async fieldValues => {
    console.log("fieldValues :", fieldValues);
    const { rating, category, review } = fieldValues;

    const formData = new FormData();
    formData.append("title", props.title);
    formData.append("content", props.contents);
    formData.append("author", props.author);
    formData.append("publisher", props.publisher);
    formData.append("price", props.price);
    formData.append("date", props.date);
    formData.append("review", review);
    formData.append("category", category);
    formData.append("rating", rating);
    formData.append("image_url", props.thumbnail);

    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const apiUrl = "http://15.165.223.171:8080/api/posts/";
      const response = await Axios.post(apiUrl, formData, {
        headers,
      });

      console.log("응답성공 ", response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { data: fieldsErrorMessages } = error.response;

        console.error("에러");
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버오류",
            description: `"에러!" $(status) 응답을받았습니다.`,
          });
        } else {
          //setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <>
      <div className="detail_containter">
        <div className="detail_form_top">
          <div className="detail_img">
            <img src={props.thumbnail} alt={props.title} />
          </div>
          <div className="detail_info">
            <div className="detail_title">
              <h2>{props.title}</h2>
            </div>

            <div className="detail_author">
              <div>저자: {props.author} </div>
              <span>출판사: {props.publisher}</span>
              <span> | {props.date} </span>
              <div>가격: {props.price}원</div>
              <br />
            </div>

            <div className="detail_contents">
              <h3>책소개</h3>
              {props.contents}
            </div>
          </div>
        </div>
        <div className="detail_form_middle">
          <Form
            onFinish={handleFinish}
            style={{ color: "red" }}
            {...layout}
            //onFinish={handleFinish}
            //   onFinishFailed={onFinishFailed}
          >
            {/* 책 카테고리(분류) */}
            <div className="detail_catecory">
              <Form.Item
                name="category"
                label={<label style={{ color: "white" }}>카테고리</label>}
                rules={[
                  {
                    required: true,
                    message: "하나의 카테고리를 선택해주세요!",
                  },
                ]}
              >
                <Radio.Group
                  options={plainOptions}
                  optionType="button"
                  // buttonStyle="solid"
                ></Radio.Group>
              </Form.Item>
            </div>

            {/* 별점 */}
            <Form.Item
              label={<label style={{ color: "white" }}>평점</label>}
              name="rating"
              rules={[{ required: true, message: "별을 눌러주세요! " }]}
              //{...fieldErrors.rating}
              // {...fieldErrors.non_field_errors}
            >
              <Rate tooltips={desc} />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>후기내용</label>}
              name="review"
              hasFeedback
              rules={[
                { required: true, message: "후기를 작성해주세요!" },
                { min: 1, message: "1글자이상 입력해주세요!" },
              ]}
            >
              <Input.TextArea
                style={{ height: "130px" }}
                placeholder="후기작성"
              />
            </Form.Item>

            {/* 후기작성버튼 */}
            <Form.Item {...tailLayout}>
              <Button className="detail_btn" type="primary" htmlType="submit">
                작성하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SearchDetailItem;

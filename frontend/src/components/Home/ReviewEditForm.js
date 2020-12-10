import React from "react";
import { Form, Input, Button, Radio, Rate } from "antd";
import { useAppContext } from "../../store";
// import { useHistory } from "react-router-dom";
import Axios from "axios";

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

const desc = ["1점", "2점", "3점", "4점", "5점"];

function ReviewEditForm({ review }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const apiUrl = `http://15.165.223.171:8080/api/posts/${review.id}/`;

  const handleReviewEdit = async fieldValues => {
    const { rating, category, review } = fieldValues;

    const formData = new FormData();
    formData.append("review", review);
    formData.append("category", category);
    formData.append("rating", rating);

    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await Axios.patch(apiUrl, formData, {
        headers,
      });

      console.log("응답성공 ", response);
      window.location.reload();
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <div className="detail_form_middle">
      <Form onFinish={handleReviewEdit} style={{ color: "red" }}>
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
          <Input.TextArea placeholder="후기작성" />
        </Form.Item>

        {/* 후기작성버튼 */}
        <Form.Item {...tailLayout}>
          <Button className="detail_btn" type="primary" htmlType="submit">
            작성하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// Antd 레이아웃
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};
export default ReviewEditForm;

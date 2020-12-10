import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAppContext } from "../../store";
import "./ReviewDetail.css";
import ReviewDetailItem from "./ReviewDetailItem";
import { useHistory } from "react-router-dom";

function ReviewDetail({ match }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [review, setReview] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const apiUrl = `http://15.165.223.171:8080/api/posts/${match.params.id}`;
    Axios.get(apiUrl, { headers })
      .then(response => {
        const data = response.data;
        // [data] : object를 응답으로 받아서 map을 적용하기위해 [] 처리
        setReview([data]);

        console.log("개인리뷰", [data]);
      })

      .catch(error => {
        console.error(error);
      });
  }, []);
  // 게시글 좋아요
  const handleLike = async ({ review, isLike }) => {
    const apiUrl = `http://15.165.223.171:8080/api/posts/${match.params.id}/like/`;
    const method = isLike ? "POST" : "DELETE"; //isLike false면 POST 요청 아니면 DELETE 요청

    try {
      const response = await Axios({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response :", response);

      setReview(prevList => {
        return prevList.map(currentReview =>
          currentReview === review
            ? { ...currentReview, is_like: isLike }
            : currentReview
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    const apiUrl = `http://15.165.223.171:8080/api/posts/${match.params.id}/`;
    const method = "DELETE";

    try {
      const response = await Axios({
        url: apiUrl,
        method,
        headers,
      });
      console.log("삭제성공 :", response);
      history.push("/");
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <>
      {/* 중괄호 리턴 필수 */}
      {review.map(review => {
        return (
          <ReviewDetailItem
            review={review}
            key={review.id}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        );
      })}
    </>
  );
}

export default ReviewDetail;

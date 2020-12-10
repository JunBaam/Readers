import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import Review from "./Review";
import { useAppContext } from "../../store";

function ReviewList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [reviewList, setReviewList] = useState([]);

  const apiUrl = "http://15.165.223.171:8080/api/posts/";

  useEffect(() => {
    Axios.get(apiUrl, headers)
      .then(response => {
        console.log("api 응답!", response);
        const { data } = response;
        setReviewList(data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <div className="review_containter">
        <div className="review_title">리뷰목록</div>
        <div className="review_items">
          {reviewList &&
            reviewList.map(review => {
              return <Review review={review} key={review.id} />;
            })}
        </div>
      </div>
    </>
  );
}

export default ReviewList;

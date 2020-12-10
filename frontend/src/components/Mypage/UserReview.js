import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import { useAxios } from "../../utils/api";
import UserReviewItem from "./UserReviewItem";
import "./UserReview.css";

function UserReview() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [reviewList, setReviewList] = useState([]);

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/api/posts/userreview",
    headers,
  });

  useEffect(() => {
    //setReviewList(originPostList);
    // 컴포넌트가 보여질때마다 데이터를 갱신
    console.log("로그인유저리스트", originPostList);
    refetch();
  }, []);

  return (
    <div className="user_review_containter">
      <div className="user_review_items">
        {originPostList &&
          originPostList.map(review => {
            return <UserReviewItem review={review} key={review.id} />;
          })}
      </div>
    </div>
  );
}

export default UserReview;

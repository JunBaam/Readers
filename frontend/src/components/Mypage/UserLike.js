import React, { useEffect } from "react";
import { useAppContext } from "../../store";
import "./UserLike.css";
import UserLikeItem from "./UserLikeItem";
import { useAxios } from "../../utils/api";

function UserLike() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  //const [reviewList, setReviewList] = useState([]);

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/api/posts/",
    headers,
  });

  useEffect(() => {
    //setReviewList(originPostList);
    // 컴포넌트가 보여질때마다 데이터를 갱신
    refetch();
  }, []);

  return (
    <div className="userlike_containter">
      <div className="userlike_items">
        {originPostList &&
          originPostList
            // 받아온값에서 is_like 값이 true 인것만 가져옴 !!
            .filter(likeTrueUser => likeTrueUser.is_like === true)
            .map(review => {
              return <UserLikeItem review={review} key={review.id} />;
            })}
      </div>
    </div>
  );
}

export default UserLike;

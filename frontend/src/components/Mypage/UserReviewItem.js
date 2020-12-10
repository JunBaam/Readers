import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";

function UserReviewItem({ review }) {
  const { id, image_url, publisher, title, author, category, rating } = review;
  const desc = ["1점", "2점", "3점", "4점", "5점"];

  return (
    <div className="user_review_wrap">
      <Link to={`/detail/${id}`} className="post_detail_link">
        <div className="user_review_card">
          <img className="user_review_cover" src={image_url} alt={title} />
          {/* <div className="review_category"> {category}</div> */}
          <div className="user_review_name">{title}</div>
          <div className="user_review_publisher">
            {author} | {publisher}
          </div>
          <div className="user_review_category">#{category}</div>
          <Rate value={rating} disabled style={{ color: "orange" }} />
          {rating ? (
            <span className="user_review_rate_text">{desc[rating - 1]}</span>
          ) : (
            ""
          )}
        </div>
      </Link>
    </div>
  );
}

export default UserReviewItem;

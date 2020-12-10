import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";

const desc = ["1점", "2점", "3점", "4점", "5점"];

function UserLikeItem({ review }) {
  const { id, image_url, publisher, title, author, category, rating } = review;

  return (
    <div className="userlike_wrap">
      <Link to={`/detail/${id}`} className="post_detail_link">
        <div className="userlike_card">
          <img className="userlike_cover" src={image_url} alt={title} />
          {/* <div className="review_category"> {category}</div> */}
          <div className="userlike_name">{title}</div>
          <div className="userlike_publisher">
            {author} | {publisher}
          </div>
          <div className="userlike_category">#{category}</div>
          <Rate value={rating} disabled style={{ color: "orange" }} />
          {rating ? (
            <span className="userlike_rate_text">{desc[rating - 1]}</span>
          ) : (
            ""
          )}
        </div>
      </Link>
    </div>
  );
}

export default UserLikeItem;

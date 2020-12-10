import React from "react";
import "./Review.css";
import { Link } from "react-router-dom";
import { Rate } from "antd";

function Review({ review }) {
  const { id, image_url, publisher, title, author, category, rating } = review;

  const desc = ["1점", "2점", "3점", "4점", "5점"];
  return (
    <>
      <div className="review_wrap">
        <div className="review_card">
          <div className="review_card_front">
            <img className="review_cover" src={image_url} alt={title} />
            {/* <div className="review_category"> {category}</div> */}
            <div className="review_name">{title}</div>
            <div className="review_publisher">
              {author} | {publisher}
            </div>
            <div className="review_category">#{category}</div>
          </div>

          <div className="review_card_back">
            <div className="review__info">
              <h3>작성자 리뷰 / 평점</h3>
              <div className="review_content">{review.review}</div>

              <Rate value={rating} disabled style={{ color: "orange" }} />
              {rating ? (
                <span className="review_rate_text">{desc[rating - 1]}</span>
              ) : (
                ""
              )}
            </div>
            <Link to={`/detail/${id}`} className="post_detail_link">
              <button className="review_detail_btn">자세히 보기</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;

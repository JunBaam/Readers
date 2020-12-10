import React, { useCallback, useState } from "react";
import { timeForToday } from "../../utils/timeCheck";
import { Card, Rate, Popover, Button } from "antd";
import {
  LikeFilled,
  LikeOutlined,
  EllipsisOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import CommentList from "./CommentList";
import ReviewEditForm from "./ReviewEditForm";

function ReviewDetailItem({ review, handleLike, handleDelete }) {
  const {
    image_url,
    publisher,
    title,
    author,
    price,
    category,
    rating,
    date,
    content,
    user,
    created_at,
    is_like,
  } = review;

  const login_user = localStorage.getItem("username");

  const [CommentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  const [ReviewEditOpened, setReviewEditOpened] = useState(false);

  // useCallback: 함수를 재사용
  const onToggleReviewEdit = useCallback(() => {
    setReviewEditOpened(prev => !prev);
  }, []);

  return (
    <>
      <div className="review_detail_containter">
        <div className="review_detail_top">
          <img src={image_url} alt={title} />
          <div className="review_detail_info">
            <h2 className="review_detail_title">{title}</h2>

            <div className="review_detail_author">
              <div>저자: {author} </div>
              <span>출판사: {publisher}</span>
              <span> | {date} </span>
              <div>가격: {price}원</div>
              <br />
            </div>
            <div className="review_detail_contents">
              <h3>책소개</h3>
              {content}
            </div>
          </div>
        </div>
        {/* 작성자 리뷰   */}
        <Card
          className="reveiw_detail_card"
          bordered="false"
          style={{
            marginTop: "10px",
            margin: "10px  ",
            width: "900px",
            boxShadow: "none",
            padding: "0px ",
          }}
          actions={[
            // 댓글
            <MessageOutlined
              key="comment"
              style={{ fontSize: "20px", color: "#fff" }}
              onClick={onToggleComment}
            />,

            // 좋아요
            is_like ? (
              <LikeFilled
                key="book"
                style={{ fontSize: "20px", color: "#1890FF" }}
                onClick={() => handleLike({ review, isLike: false })}
              />
            ) : (
              // 클릭시 True
              <LikeOutlined
                key="book"
                style={{ fontSize: "20px", color: "#1890FF" }}
                onClick={() => handleLike({ review, isLike: true })}
              />
            ),

            <Popover
              key="more"
              content={
                <Button.Group>
                  {user.username === login_user ? (
                    <>
                      <Button
                        onClick={onToggleReviewEdit}
                        style={{
                          fontSize: "15px",
                          color: "#fff",
                          background: "#1890FF",
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        onClick={() => handleDelete({ review })}
                        style={{
                          fontSize: "15px",
                          color: "#fff",
                          background: "red",
                        }}
                      >
                        삭제
                      </Button>
                    </>
                  ) : (
                    <MoreOutlined />
                  )}
                </Button.Group>
              }
            >
              <EllipsisOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Popover>,
          ]}
        >
          <div className="review_detail_profile">
            <img src={user.avatar} alt={user.username} />
            <div className="review_detail_username">{user.username}</div>
            <div className="review_detail_category">#{category}</div>
          </div>

          <div className="review_detail_rate">
            <span>
              <Rate value={rating} disabled style={{ color: "orange" }} />
            </span>
            <div className="review_detail_description">
              {review.review}
              <div className="review_detail_date">
                {timeForToday(created_at)}
              </div>
            </div>
          </div>
        </Card>
        {/* 댓글 */}
        {CommentFormOpened && <CommentList review={review} />}
        {/* 게시글수정 */}
        {ReviewEditOpened && <ReviewEditForm review={review} />}
      </div>
    </>
  );
}

export default ReviewDetailItem;

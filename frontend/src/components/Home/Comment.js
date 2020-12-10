import React from "react";
import { timeForToday } from "../../utils/timeCheck";

function Comment({ comment }) {
  const { user, message, created_at } = comment;

  return (
    <>
      <div className="comment_profile">
        <img src={user.avatar} alt={user.username} />
        <div className="comment_username">{user.username}</div>
        <div className="comment_date">{timeForToday(created_at)}</div>
      </div>
      <div className="comment_message">{message}</div>
    </>
  );
}

export default Comment;

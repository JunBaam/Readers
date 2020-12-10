import React, { useState } from "react";
import Axios from "axios";
import { useAppContext } from "../../store";
import { Input, Button } from "antd";
import useAxios from "axios-hooks";
import Comment from "./Comment";
import "./Comment.css";

function CommentList({ review }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const apiUrl = `http://15.165.223.171:8080/api/posts/${review.id}/comments/`;

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://15.165.223.171:8080/api/posts/${review.id}/comments/`,
    headers,
  });

  console.log("댓글목록", commentList);

  const [commentContent, setCommentContent] = useState("");

  const handleCommentSave = async () => {
    console.group("handleCommentSave");
    try {
      const response = await Axios.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      console.log(response);
      setCommentContent("");
      refetch();
    } catch (error) {}

    console.log(error);
  };

  return (
    <div className="comment_container">
      {/* 비어있을경우도 반영한다. */}
      {commentList &&
        commentList.map(comment => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      {/* 현재작성 : {commentContent} */}
      <Input.TextArea
        style={{
          width: "800px",
          height: "80px",
          marginTop: "15px",
          marginBottom: ".5em",
          zIndex: "inherit",
        }}
        value={commentContent}
        // 작성한값을 반영
        onChange={e => setCommentContent(e.target.value)}
      />

      <Button
        block
        style={{ fontWeight: "bold" }}
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글 쓰기
      </Button>
    </div>
  );
}

export default CommentList;

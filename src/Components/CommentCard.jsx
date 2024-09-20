import React from "react";

const CommentCard = ({ comment }) => (
  <li className="comment-card">
    <div className="comment-header">
      <span className="comment-author">{comment.author}</span>
      <span className="comment-timestamp">{comment.created_at}</span>
    </div>
    <p className="comment-text">{comment.body}</p>
    <p className="comment-votes">Votes: {comment.votes}</p>
  </li>
);

export default CommentCard;

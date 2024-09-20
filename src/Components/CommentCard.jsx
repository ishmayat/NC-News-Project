import React, { useContext } from "react";
import UserContext from "./Users/UserContext";

const CommentCard = ({ comment, currentUser, onDeleteComment }) => {
  const { user } = useContext(UserContext); // Access current user

  return (
    <li className="comment-card">
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-timestamp">{comment.created_at}</span>
        {/* Conditionally render delete button if it's the current user's comment */}
        {currentUser && currentUser.username === comment.author && (
          <button
            className="delete-comment-button"
            onClick={() => onDeleteComment(comment.comment_id)}
          >
            Delete
          </button>
        )}
      </div>
      <p className="comment-text">{comment.body}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </li>
  );
};

export default CommentCard;

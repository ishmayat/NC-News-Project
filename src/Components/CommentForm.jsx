import { useState } from "react";
import { postComments } from "../api";
import React from "react";

const CommentForm = ({
  article_id,
  setNewCommentIsSubmitting,
  currentCommentCount,
  setUpdateCommentCount,
}) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState("");
  const [noEmptyCommentBody, setNoEmptyCommentBody] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentBody) {
      setNoEmptyCommentBody(true);
      return;
    }

    const newComment = {
      body: commentBody,
      // Added a temporary identifier (using Date.now())
      id: Date.now(), //  unique identifier for optimistic rendering
    };
    setNewCommentIsSubmitting(true);

    postComments(article_id, newComment)
      .then((response) => {
        setCommentBody("");
        setNewCommentIsSubmitting(false);
        setError(false);
        // Update comment count after successful response
        setUpdateCommentCount(currentCommentCount + 1);
      })
      .catch((err) => {
        setError(true);
        setErrors(err.response.data);

        setUpdateCommentCount(currentCommentCount - 1);
      });
  };

  if (errors) return "error";

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form">
        <div className="comment-body">
          <label htmlFor="comment_body">
            Add a comment :
            <input
              className="textbox"
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
              id="comment_body"
            />
          </label>
          {noEmptyCommentBody ? (
            <div>
              <h5>You cannot post an empty comment. Please write something!</h5>
            </div>
          ) : null}
          {error ? (
            <h5>Your comment did not go through! Please try again later</h5>
          ) : null}
          <input
            type="submit"
            value="Submit comment"
            disabled={noEmptyCommentBody} // Disable button while submitting
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

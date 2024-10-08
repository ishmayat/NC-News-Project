import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  voteOnArticle,
  deleteCommentById,
} from "../api";
import React from "react";
import Header from "./Header";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import UserContext from "./Users/UserContext";

const ArticlePage = () => {
  const [user, setUser] = useState({
    username: "tickle122",
  });
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [localVotes, setLocalVotes] = useState(0);
  const [newCommentIsSubmitting, setNewCommentIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([articleResponse, commentsResponse]) => {
        setArticle(articleResponse);
        setComments(commentsResponse);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error: Invalid response data");
      });
  }, [article_id]);

  const handleVote = (value) => {
    setLocalVotes(localVotes + value);

    voteOnArticle(article_id, value)
      .then((response) => {
        console.log("Vote updated successfully:", response);
        // Re-fetch the article to display the updated vote count
        getArticleById(article_id)
          .then((updatedArticle) => {
            setArticle(updatedArticle);
          })
          .catch((error) => {
            console.error("Error fetching updated article:", error);
          });
      })
      .catch((error) => {
        setLocalVotes(localVotes - value);
        alert("An error occurred while updating your vote.");
      });
  };

  const handleDeleteComment = (commentId) => {
    // Optimistic update (remove comment from UI immediately)
    setComments(comments.filter((comment) => comment.comment_id !== commentId));

    deleteCommentById(commentId) // Send delete request to backend
      .then((response) => {
        console.log("Comment deleted successfully:", response);
        // Handle successful deletion on the server-side
      })
      .catch((error) => {
        // Revert optimistic update and display error message if deletion fails
        setComments(
          comments.concat(comments.find((c) => c.comment_id === commentId))
        ); // Add comment back to state
        console.error("Error deleting comment:", error);
        alert(
          "An error occurred while deleting the comment. Please try again later."
        );
      });
  };

  if (isLoading) return <h3>Loading article...</h3>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="article-single">
      <div>
        <h1>{article.title}</h1>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created at: {article.created_at}</h4>
        <img src={article.article_img_url} alt={`${article.title}`} />
        <p>{article.body}</p>
        <span className="vote-in-article">💙{article.votes}</span>
        <span className="votes-count-single">
          <button className="like-button" onClick={() => handleVote(1)}>
            Like
          </button>
          <button className="dislike-button" onClick={() => handleVote(-1)}>
            DisLike
          </button>
          {article.comment_count}
        </span>
      </div>
      {comments.length > 0 && (
        <section className="comments-section">
          <h2 className="comments-text">Comments ({comments.length})</h2>
          <ul className="comment-list">
            {comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                currentUser={user} // CommentCard uses currentUser to check if it's the user's comment
                onDeleteComment={handleDeleteComment} // Pass delete function
              />
            ))}
          </ul>
        </section>
      )}
      {/* Handle the case of no comments */}
      {comments.length === 0 && (
        <p className="no-comments">
          There are no comments for this article yet.
        </p>
      )}
      <UserContext.Provider value={{ user, setUser }}>
        <CommentForm
          article_id={article_id}
          setComments={setComments}
          setNewCommentIsSubmitting={setNewCommentIsSubmitting}
          currentCommentCount={article.comment_count}
          setUpdateCommentCount={(newCount) =>
            setComments([...comments, newCount])
          }
        />
      </UserContext.Provider>
    </div>
  );
};

export default ArticlePage;

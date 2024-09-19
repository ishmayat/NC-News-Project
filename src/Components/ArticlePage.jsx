import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api";
import React from "react";
import Header from "./Header";
import CommentCard from "./CommentCard";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([articleResponse, commentsResponse]) => {
        setArticle(articleResponse);
        setComments(commentsResponse);
        console.log("Article:", articleResponse);
        console.log("Comments:", commentsResponse);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error: Invalid response data");
      });
  }, [article_id]);

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
        <span className="votes-count-single">
          💙{article.votes}
          💬{article.comment_count}
        </span>
      </div>
      {comments.length > 0 && (
        <section className="comments-section">
          <h2 className="comments-text">Comments ({comments.length})</h2>
          <ul className="comment-list">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ArticlePage;

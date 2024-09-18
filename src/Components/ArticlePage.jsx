import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
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
    </div>
  );
};

export default ArticlePage;

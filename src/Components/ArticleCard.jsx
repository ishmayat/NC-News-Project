import { Link } from "react-router-dom";
import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt={`${article.title}`} />
      </Link>
      <Link to={`/articles/${article.topic}`}>
        <h5>{article.topic}</h5>
      </Link>
      <Link to={`/article/${article.article_id}`}></Link>
    </section>
  );
};

export default ArticleCard;

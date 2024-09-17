import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle } from "../api";

const ArticlePage = (anyUser) => {
  const { article_id } = useParams();
  const query = `/${article_id}`;
  const [article, setArticle] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticle(query)
      .then((response) => {
        setArticle(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setIsLoading(false);
      });
  }, [query]);

  if (isLoading) return <h3>Article is loading...</h3>;

  return (
    <div className="article-single">
      <div>
        <h1>{article.title}</h1>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created at: {article.created_at}</h4>
        <img src={article.article_img_url} alt={`${article.title}`} />
        <p>{article.body}</p>
      </div>
    </div>
  );
};

export default ArticlePage;

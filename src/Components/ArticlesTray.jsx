import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";

const ArticlesTray = ({ articles }) => {
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((response) => {
        if (response && response.data) {
          setIsLoading(false);
        } else {
          setError("Error: Invalid response data");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [topic]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <h3>Articles are loading...</h3>;

  return (
    <>
      {topic ? <h4>{`"${topicDescription}"`}</h4> : <p></p>}
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </>
  );
};

export default ArticlesTray;

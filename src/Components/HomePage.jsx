import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import React from "react";
import ArticlePage from "./ArticlePage";
import ArticlesTray from "./ArticlesTray";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(true);
  const [isLoadingMostRecent, setIsLoadingMostRecent] = useState(false);

  useEffect(() => {
    setIsLoadingMostRecent(true);
    getArticles()
      .then((response) => {
        setArticles(response);
        setIsLoadingMostRecent(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading most recent articles");
        setIsLoadingMostRecent(false);
      });
  }, []);

  return (
    <>
      <h2 className="main-header"></h2>
      {error && <h3>{error}</h3>}
      <ArticlesTray articles={articles} />
    </>
  );
};

export default HomePage;

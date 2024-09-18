import { useState } from "react";
import "./CSS/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import React from "react";
import ArticlesTray from "./Components/ArticlesTray";
import ArticlePage from "./Components/ArticlePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
      <Header setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesTray />} />
        <Route path="/article/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;

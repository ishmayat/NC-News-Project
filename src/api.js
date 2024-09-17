import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://issh-nc-news.onrender.com/api",
});

export const getArticles = (query = "") => {
  return ncNewsApi.get(`/articles${query}`).then((response) => {
    return response.data.articles;
  });
};

export const getArticle = (query = "") => {
  return ncNewsApi.get(`/articles${query}`).then((response) => {
    return response.data.article;
  });
};

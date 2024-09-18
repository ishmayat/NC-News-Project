import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://issh-nc-news.onrender.com/api",
});

export const getArticles = (query = "") => {
  return ncNewsApi.get(`/articles${query}`).then((response) => {
    return response.data.articles;
  });
};

export const getArticleById = (id) => {
  return ncNewsApi
    .get(`/articles/${id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

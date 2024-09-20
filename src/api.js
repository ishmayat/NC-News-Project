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

export const getCommentsByArticleId = (id) => {
  return ncNewsApi.get(`/articles/${id}/comments`).then((response) => {
    const comments = response.data.comments.map((comment) => {
      console.log(response.data, "<-----response comment");
      //comment.created_at = formatDate(comment.created_at);
      return comment;
    });
    return comments;
  });
};

export const voteOnArticle = (id, value) => {
  return ncNewsApi
    .patch(`/articles/${id}`, {
      inc_votes: value,
    })
    .then((response) => {
      const updatedVoteCount = response.data.votes || 0;
      return updatedVoteCount;
    })
    .catch((error) => {
      console.error("Error voting on article:", error);
      throw error;
    });
};

export const postComments = (article_id, newComment) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      body: newComment.body,
      username: newComment.username || "tickle122",
    })
    .then((response) => {
      if (!response) throw new Error("Failed to post comment");
      return response.data.postedComment;
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

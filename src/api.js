import axios from "axios";

const BASE_URL = "https://young-savannah-18120.herokuapp.com/api";

export const getSingleDatum = async (dataType, singleDatum) => {
  const { data } = await axios.get(`${BASE_URL}/${dataType}/${singleDatum}`);
  return data;
};

export const getAllData = async dataType => {
  const { data } = await axios.get(`${BASE_URL}/${dataType}`);
  return data;
};

export const getData = async (dataType, singleDatum, subData) => {
  const { data } = await axios.get(
    `${BASE_URL}/${dataType}/${singleDatum}/${subData}`
  );
  return data[subData];
};

export const updateData = async (urlId, value) => {
  const { data } = await axios.put(`${BASE_URL}${urlId}/?vote=${value}`);
  return data;
};

export const postArticle = async (topicSlug, articleToAdd) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topicSlug}/articles`,
    articleToAdd
  );
  return data;
};
export const postComment = async (articleId, commentToAdd) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    commentToAdd
  );
  return data;
};
export const deleteComment = async commentId => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${commentId}`);
  return data;
};

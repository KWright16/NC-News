import axios from "axios";

const BASE_URL = "https://young-savannah-18120.herokuapp.com/api";

export const getData = async (dataType, singleDatum) => {
  if (!singleDatum) {
    const { data } = await axios.get(`${BASE_URL}/${dataType}`);
    return data;
  } else {
    const { data } = await axios.get(
      `${BASE_URL}/${dataType}/${singleDatum}/articles`
    );
    return data;
  }
};
export const getArticles = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data;
};
export const getUsers = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

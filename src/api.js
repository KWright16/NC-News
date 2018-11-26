import axios from "axios";

const BASE_URL = "https://localhost:9090/api";

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data;
};

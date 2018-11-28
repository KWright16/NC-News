import axios from "axios";

const BASE_URL = "https://young-savannah-18120.herokuapp.com/api";

export const getUsers = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};
export const getData = async (dataType, singleDatum, subData) => {
  if (subData) {
    const { data } = await axios.get(
      `${BASE_URL}/${dataType}/${singleDatum}/${subData}`
    );
    return data;
  } else if (singleDatum) {
    const { data } = await axios.get(`${BASE_URL}/${dataType}/${singleDatum}`);
    return data;
  } else {
    const { data } = await axios.get(`${BASE_URL}/${dataType}`);
    return data;
  }
};
export const updateData = async (urlId, value) => {
  const { data } = await axios.put(`${BASE_URL}${urlId}/?vote=${value}`);
  return data;
};

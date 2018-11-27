import axios from "axios";

const BASE_URL = "https://young-savannah-18120.herokuapp.com/api";

export const getData = async dataType => {
  const { data } = await axios.get(`${BASE_URL}/${dataType}`);
  return data;
};

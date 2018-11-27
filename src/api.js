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
// if (allData === "students" && singleDatum) {
//   const { data } = await axios.get(`${BASE_URL}/${allData}/${singleDatum}`);
//   return data;
// } else if (
//   (allData === "blocks" && singleDatum) ||
//   (allData === "cohorts" && singleDatum)
// ) {
//   const { data } = await axios.get(
//     `${BASE_URL}/${allData}/${singleDatum}/students`
//   );
//   return data;
// } else if (allData === "blocks" || allData === "cohorts") {
//   const { data } = await axios.get(`${BASE_URL}/${allData}`);
//   return data;
// } else {
//   const { data } = await axios.get(`${BASE_URL}/${allData}`);
//   return data;
// }

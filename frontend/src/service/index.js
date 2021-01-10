import axios from "axios";
// path to service
const DATA_API_PATH = "http://localhost:5000";

export default {
  fetchData() {
    return axios
      .get(DATA_API_PATH)
      .then(response => {
        console.log(response.data);
        if (response.data) {
          return response.data;
        }
        return null;
      })
      .catch(e => {
        throw e;
      });
  }
};

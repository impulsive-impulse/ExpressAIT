import axios from "axios";

const instance = axios.create({
  baseURL: "https://expressait-cb8d9.firebaseio.com/",
});

export default instance;

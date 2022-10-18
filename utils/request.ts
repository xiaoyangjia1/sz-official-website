import axios from "axios";
const service = axios.create({
  baseURL: "http://47.115.228.82", // url = base url + request url
  timeout: 5000, // request timeout
});
export default service;

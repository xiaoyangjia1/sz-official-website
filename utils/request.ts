import axios from "axios";
const service = axios.create({
  baseURL: process.env.baseURL, // url = base url + request url
  timeout: 5000, // request timeout
});

export default service;

import axios from "axios";

export default axios.create({
  baseURL: "https://papi-katering.herokuapp.com",
});

// http://localhost:8080/
// https://papi-katering.herokuapp.com

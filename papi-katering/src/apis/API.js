import axios from "axios";

export default axios.create({
    baseURL: "https://papi-katering.herokuapp.com"
});
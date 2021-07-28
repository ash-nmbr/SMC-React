import axios from "axios";

export default axios.create({
  baseURL: "https://smc-springboot.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});

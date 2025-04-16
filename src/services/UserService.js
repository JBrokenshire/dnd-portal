import axios from "@axios";

const baseUrl = "/users"

export default {
  create(dto) {
    return axios.post(baseUrl, dto)
  }
}
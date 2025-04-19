import axios from "@axios";
import HelperService from "@/services/HelperService";

const baseUrl = "/characters"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseUrl}${queryString}`)
  }
}
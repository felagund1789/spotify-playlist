import axios from "axios";
import getAccessToken from "./AccessToken";

export default axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

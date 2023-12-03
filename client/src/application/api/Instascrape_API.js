import axios from "axios";
import { BASE_URL } from "./env";

function getPostsByHashtag(hashtag) {
  return axios
    .get(
      `${BASE_URL ? BASE_URL : "http://localhost:8000/api"}/getHashtagPosts`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          hashtag,
        },
      }
    )
    .then((data) => data.data);
}

function scrapePostsByHashtag(hashtag) {
  return axios
    .get(
      `${
        BASE_URL ? BASE_URL : "http://localhost:8001/api"
      }/scrapePostsByHashtag`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          hashtag,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getPostsByHashtag, scrapePostsByHashtag };

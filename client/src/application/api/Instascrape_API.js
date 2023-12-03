import axios from "axios";
import { BASE_URL } from "./env";

function getPostsByHashtag(hashtag) {
  return axios
    .get(`${BASE_URL}/getHashtagPosts`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        hashtag,
      },
    })
    .then((data) => data.data);
}

function scrapePostsByHashtag(hashtag) {
  return axios
    .get(`${BASE_URL}/scrapePostsByHashtag`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        hashtag,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getPostsByHashtag, scrapePostsByHashtag };

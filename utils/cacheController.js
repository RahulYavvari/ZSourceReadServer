// CACHE SERVER: 16.170.233.233:9000

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const CACHE_SERVER_URI = "http://16.170.233.233:9000";

const fetchCache = async (tag) => {
    let cacheResponse = await axios.get(`${process.env.CACHE_SERVER_URI || CACHE_SERVER_URI}/api/v1/cache/get?key=${tag}`);
    return cacheResponse;
};

const loadCache = async (tag, value) => {
    let cacheResponse = await axios.post(`${process.env.CACHE_SERVER_URI || CACHE_SERVER_URI}/api/v1/cache/set?key=${tag}&value=${value}`);
    return cacheResponse.data.status == "success";
}

export { fetchCache, loadCache };
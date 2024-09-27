import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { fetchCache, loadCache } from "./utils/cacheController.js";
import fetchDatabase from "./utils/databaseController.js";

const app = express();

const PORT = 6000;

app.get('/api/v1/posts/read', async (req, res) => {
    try {
        const { tag } = req.query;
        let cacheResponse = await fetchCache(tag);
        cacheResponse = cacheResponse.data;
        if(cacheResponse.value == null) {
            const databaseResponse = await fetchDatabase(tag);
            const stringDatabaseResponse = JSON.stringify(databaseResponse);
            
            await loadCache(databaseResponse.tag, stringDatabaseResponse);
            
            res.status(200).json(stringDatabaseResponse);
        } else {
            res.status(200).json(cacheResponse);
        }
    } catch(err) {
        console.error("[LOG] Some error occured while /posts/read");
        res.status(500).json({status: "failed", message: "some error occured while /posts/read"});
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log("[LOG] Read Server Connected to port 6000");
});
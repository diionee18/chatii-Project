import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
const db = getDb();
dotenv.config();
const secret = process.env.SECRET;

// Hämta all Kanaler
router.get("/", async (req, res) => {
    await db.read();
    const channelNames = db.data.channels.map(
        (channel) => Object.keys(channel)[0]
    );
    res.status(200).send(channelNames);
});

// Kom åt en specific kanal
router.get("/:channelName", async (req, res) => {
    const channelName = req.params.channelName.toLowerCase();
    if (channelName !== "open"){
        let authHeader = req.headers.authorization;
    
        if (!authHeader) {
            res.status(401).json({
                message: "You must be authenticated to view this very secret data.",
            });
            return;
        }

        let token = authHeader.replace("Bearer: ", "");
        const decoded = jwt.verify(token, secret);
        if ( !decoded ) {
            res.status(401).json({
                message: "You must be authenticated to view this very secret data.",
            });
            return;
        }

        console.log("GET /:channelName decoded: ", decoded);
    }

    await db.read();
    const channels = db.data.channels;

    try {

        const channel = channels.find((c) => channelName in c);
        const users = db.data.users;

        if (!channel) {
            console.log("GET /:channelName " + channelName + " not found.");
            res.status(404).json({
                error: "Channel not found",
                message: `The channel '${channelName}' was not found.`,
            });
        }

        console.log("GET /:channelName OK", channel);
        const data = channel[channelName].map((c) => {
            const matchingUser = users.find((user) => user.id === c.userId);
            return matchingUser ? { ...c, userId: matchingUser.name } : item;
        });

        console.log("GET /:channelName OK", data);
        res.status(200).json(data);
    } catch (error) {
        console.log("GET /:channelName error: " + error.message);
        res.sendStatus(401);
    }
});

// Lägg till kanaler

router.post("/", async (req, res) => {
    await db.read();
    const existedChannels = db.data.channels.map(
        (channel) => Object.keys(channel)[0]
    );
    const newChannelName = req.body.name;

    function generateId() {
        let id = Math.floor(Math.random() * 1000);
        while (!db.data.users.find((user) => user.id === id)) {
            id = Math.floor(Math.random() * 1000);
        }
        return id;
    }

    if (existedChannels.includes(newChannelName)) {
        res.status(409).send(
            "En kanal med detta namn finns redan, försök med ett annat namn."
        );
        return;
    }

    const newChannel = {
        [newChannelName]: [],
    };

    db.data.channels.push(newChannel);
    db.write();
    res.sendStatus(200);
});

export default router;

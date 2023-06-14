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

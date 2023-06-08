import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();
const db = getDb();


// Skickar meddenlanden till specefica kanaler
router.post("/:channelName", async (req, res) => {
    const channelName = req.params.channelName.toLowerCase();
    const message = req.body.message;
    const userId = req.body.userId;

    try {
        await db.read();
        const channels = db.data.channels;

        let foundChannel = null;
        channels.forEach((channel) => {
            const channelKey = Object.keys(channel)[0]
            if(channelKey.toLowerCase() === channelName){
                foundChannel=channel[channelKey]
            }
        })

        if (!foundChannel) {
            console.log("POST /:channelName " + channelName + " not found.");
            res.status(404).json({
                error: "Channel not found",
                message: `The channel '${channelName}' was not found.`,
            });
            return;
        }

        const newMessage = {
            userId: userId,
            timestamp: req.timestamp,
            message: message,
        };

        foundChannel.push(newMessage);
        await db.write();
        res.status(200).json({
            message: "Meddelandet har skickats till kanalen",
            data: newMessage,
        });
    } catch (error) {
        console.error("Fel vid skickande av meddelandet:", error);
        res.status(500).json({
            error: "Server error",
            message: "An error occurred while sending the message.",
        });
    }
});

export default router;

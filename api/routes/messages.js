import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();
const db = getDb();
dotenv.config();
const secret = process.env.SECRET;



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
            return
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




// Ändra meddelande
router.put("/:channelName", async(req, res) => {
    const channelName = req.params.channelName.toLowerCase();
    const timeStamp = req.body.timestamp
    const editedMessage = req.body.message
    await db.read()

    try{

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


        let foundMessage = null;
        let foundIndex = -1;
        foundChannel.forEach((message, index)=>{
            if (message.timestamp === timeStamp){
                foundMessage = message;
                foundIndex = index
            }

        })

        if (!foundMessage) {
            console.log("PUT /:channelName " + channelName + " message not found.");
            res.status(404).json({
                error: "Message not found",
                message: "The specified message was not found in the channel.",
            });
            return;
        }

        foundMessage = { ...foundMessage, message: editedMessage }
        foundChannel[foundIndex] = foundMessage

        await db.write()
        res.status(200).json({
            message: "Meddelandet har uppdaterats i kanalen",
            data: foundMessage
        })

    }catch (error){
        console.error("Fel vid uppdatering av meddelandet");
        res.status(500).json({
            error: "Server error",
            message: "An error occurred while updating the message.",
        });
    }
})


router.delete("/:channelName", async (req, res) => {
    const channelName = req.params.channelName.toLowerCase();
    const timestamp = req.body.timestamp;
    await db.read();

    try {
        const channels = db.data.channels;

        let foundChannel = null;
        channels.forEach((channel) => {
            const channelKey = Object.keys(channel)[0];
            if (channelKey.toLowerCase() === channelName) {
                foundChannel = channel[channelKey];
            }
        });

        if (!foundChannel) {
            console.log("DELETE /:channelName " + channelName + " not found.");
            res.status(404).json({
                error: "Channel not found",
                message: `The channel '${channelName}' was not found.`,
            });
            return;
        }

        let foundMessage = null;
        let foundIndex = -1;
        foundChannel.forEach((message, index) => {
            if (message.timestamp === timestamp) {
                foundMessage = message;
                foundIndex = index;
            }
        });

        if (!foundMessage) {
            console.log("DELETE /:channelName " + channelName + " message not found.");
            res.status(404).json({
                error: "Message not found",
                message: "The specified message was not found in the channel.",
            });
            return;
        }

        foundChannel.splice(foundIndex, 1); // Ta bort meddelandet från kanalen

        await db.write();
        res.status(200).json({
            message: "Meddelandet har tagits bort från kanalen",
        });
    } catch (error) {
        console.error("Fel vid borttagning av meddelandet");
        res.status(500).json({
            error: "Server error",
            message: "An error occurred while deleting the message.",
        });
    }
});




export default router;

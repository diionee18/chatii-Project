import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
const db = getDb();
dotenv.config();
const secret = process.env.SECRET;

router.post("/login", async (req, res) => {
    await db.read();
    const users = db.data.users;
    console.log(req.body);
    const username = req.body.name;
    const userPassword = req.body.password;

    if (!req.body || !username || !userPassword) {
        res.status(400).send("Användaruppgifter ofullständiga.");
        return;
    }

    //för backend
    const foundName = users.find((user) => user.name === username);

    const foundPassword = users.find((user) => user.password === userPassword); 
    // const foundPassword = foundName.password === userPassword;

    if (!foundName) {
        console.log("Felaktigt användarnamn");
        res.sendStatus(401);
        return;
    }
    if (!foundPassword) {
        console.log("Felaktigt lösenord");
        res.sendStatus(401);
        return;
    }

    const day = 3600 * 24;
    const payload = { userId: foundName.id };

    let token = jwt.sign(payload, secret, { expiresIn: day });
    console.log("signed JWT: " + token);
    res.send({id: foundName.id, token: token});
});

router.post("/signup", async (req, res) => {
    await db.read();
    const users = db.data.users;
    const username = req.body.name;
    const userPassword = req.body.password;

    function generateId() {
        let id = Math.floor(Math.random() * 1000);
        while (!db.data.users.find((name) => name.id === id)) {
            return (id = Math.floor(Math.random() * 1000));
        }
    }

    let newUser = {
        id: generateId(),
        name: username,
        password: userPassword,
    };

    const getUsers = users.find((user) => user.name == newUser.name);

    if (getUsers) {
        res.status(409).send(
            "Konto redan registrerat. Prova att logga in eller nollställa om du har glömt ditt lösenord."
        );
        return;
    }

    if (!req.body || !newUser.name || !newUser.password) {
        res.status(400).send("Användaruppgifter ofullständiga.");
        return;
    }

    db.data.users.push(newUser);
    db.write();
    res.sendStatus(200);
});


router.get('/channel', async (req, res) => {
    let authHeader = req.headers.authorization

	if( !authHeader ) {
		res.status(401).send({
			message: 'You must be authenticated to view this very secret data.'
		})
		return
	}
	let token = authHeader.replace('Bearer: ', '')
    await db.read();    
    const channels = db.data.channels;

	try {
		const decoded = jwt.verify(token, secret)
		console.log('GET /channel decoded: ', decoded)
        const channel = channels.find(c => req.body.channel.toLowerCase() in c);
        console.log(req.body.channel, channel)
		
        if ( ! channel ) {
            console.log('GET /channel ' + channel.decoded + ' not found.')
            res.sendStatus(404).json({error: 'Channel not found', message: `The channel '${channelName}' was not found.` })
        }

        console.log('GET /channel OK', channel)
		res.status(200).json(channel)

	} catch(error) {
		console.log('GET /channel error: ' + error.message)
		res.sendStatus(401)
	}
})

export default router;

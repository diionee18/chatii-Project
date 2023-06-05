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
    const foundPassword = foundName.password === userPassword;

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
    const payload = { userId: users.id };

    let token = jwt.sign(payload, secret, { expiresIn: day });
    console.log("signed JWT: " + token);
    res.send(token);
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

export default router;

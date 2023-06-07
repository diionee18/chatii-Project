import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
const db = getDb();
dotenv.config();
const secret = process.env.SECRET;


// GET Users - hela listan
router.get("/", async (req, res) => {
    try {
        await db.read();
        const users = db.data.users;
        console.log("Visar user-lista", users);
        res.send(users);
    } catch (error) {
        console.log("Detta är vad vi får tillbaka i user-listan", error);
        res.status(500).send("Ett fel inträffade med att hämta användarna.");
    }
});

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

// Lägg till användare
router.post("/", async (req, res) => {
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

// Ta bort användare
router.delete("/:id", async (req, res) => {
    await db.read();

    let id = Number(req.params.id);
    let userToDelete = db.data.users.find((user) => user.id === id);
    if (!userToDelete) {
        return res.status(400).send("Kunde inte hitta användaren, kontrollera att Id är är korrekt");
    } else {
        db.data.users = db.data.users.filter((user) => user.id !== id);
        await db.write();
        console.log("test 3");
        return res.sendStatus(200);
    }
});




export default router;

import express from "express";
import { getDb } from "../data/database.js";
import { isValidId, isValidUser } from "../data/validate.js";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'

const router = express.Router();
const db = getDb();
dotenv.config()
const secret = process.env.SECRET

router.post("/login", async (req, res) => {
    await db.read()
        const users = db.data.users;
        const userName = req.body.name;
        const userPassword = req.body.password;
        
        const getUser = users.find((user) => user.name === userName && user.password === userPassword);

        if (!req.body || !userName || !userPassword) {
            res.status(400).send("Användaruppgifter ofullständiga.");
            return 
        } 
        
        //för backend
        const foundName = users.find((user) => user.name === userName);
        const foundPassword = users.find((user) => user.password === userPassword);

        if(!foundName){
            console.log("Felaktigt användarnamn");
            res.sendStatus(401)
            return
        }
        if(!userPassword){
            console.log("Felaktigt lösenord");
            res.sendStatus(401)
            return
        }

        const day = 3600 * 24 

        let token = sign(users.id, secret, {expiresIn: day})
        console.log('sifned JWT: ' + token);
        res.send(token)
 
}
)

export default router
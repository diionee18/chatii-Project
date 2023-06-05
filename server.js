import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv'

import usersRouter from "./api/routes/users.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 2065


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	next();
})

app.options('*', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.send();
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})

app.use('/api', usersRouter)

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
})


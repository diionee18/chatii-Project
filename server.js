import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const port = process.env.PORT || 2065
const secret = process.env.SECRET

app.use(cors())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})


app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
})

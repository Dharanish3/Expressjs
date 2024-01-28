import express from "express"
import Routers from './Source/Routes/web.js'
import dotenv from "dotenv"
dotenv.config();
const app = express()
const Port = process.env.PORT 

app.use(express.json())
app.use('/', Routers)


app.listen(Port , () => console.log(`App run on ${Port} server`))
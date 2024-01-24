import express from "express"
import Routers from './Source/Routes/web.js'
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use('/', Routers)


app.listen(port , () => console.log(`App run on ${port} server`))
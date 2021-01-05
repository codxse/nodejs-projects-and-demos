import express from "express"
import path from "path"
import socketio from "socket.io"
import cors from "cors"
import helmet from "helmet";

const RESOURCES = path.join(__dirname + "/../resources/public")

const app = express()
const server = app.listen(9000)
const io = new socketio.Server(server)

app.use(cors())
app.use(helmet())
app.use(express.static(RESOURCES))
app.get("/", (req, res) => res.sendFile(RESOURCES + "/index.html"))


export default {
  app,
  io,
}

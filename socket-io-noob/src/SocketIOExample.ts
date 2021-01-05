import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import http from "http"
import socketio from "socket.io"

export namespace SocketIOExample {
  export const setup = () => {
    const app = express()
    const server = http.createServer(app)
    const RESOURCES = path.join(__dirname + "/res/public")
    const HTML_RESOURCES = RESOURCES + "/index2.html"
    const io = new socketio.Server(server)

    //console.log({io})
    io.on("connection", (socket, req) => {
      console.log("HELLOOOWWW")
      socket.emit("welcome", "welcome to socket io")
      socket.on("message", message => {
        console.log({message})
      })
    })

    app.use(cors());
    app.use(express.static(RESOURCES))
    app.get("/", (req: Request, res: Response) => res.sendFile(HTML_RESOURCES))

    server.listen(8001)
  }
}
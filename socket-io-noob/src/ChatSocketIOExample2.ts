 import express, {Request, Response} from "express"
 import cors from "cors"
 import path from "path"
 import http from "http"
 import socketio from "socket.io"

 export namespace ChatSocketIOExample2 {
  export const setup = () => {
    const app = express()
    const server = http.createServer(app)
    const RESOURCES = path.join(__dirname + "/res/public")
    const HTML_RESOURCES = RESOURCES + "/index3_2.html"
    const io = new socketio.Server(server)

    const adminNS = io.of("/admin")
    adminNS.on("connection", (socket, req) => {
      console.log("Someone connected to /admin")
      adminNS.emit("newMessageFromAdmin", "Welcome to /admin channel")
    })

    io.on("connection", (socket, req) => {
      socket.emit("messageFromServer", { data: "Welcome to socket io server" })
      socket.on("messageToServer", (data) => {
        console.log({data})
      })

      socket.join("level1")
      socket.to("level1").emit("joined", `${socket}: I have joined the level 1 room`)

      socket.on("newMessageFromClient", (data) => {
        console.log(data)
        io.of("/").emit("newMessageFromServer", {text: data.text})
        console.log("sent")
      })
    })

    app.use(cors());
    app.use(express.static(RESOURCES))
    app.get("/", (req: Request, res: Response) => res.sendFile(HTML_RESOURCES))

    server.listen(8003)
   }
 }
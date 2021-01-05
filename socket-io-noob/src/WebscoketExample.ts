import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import http from "http"
import websocket from "ws"

export namespace WebscoketExample {
  export const setup = () => {
    const app = express()
    const server = http.createServer(app)
    const wss = new websocket.Server({server})
    const RESOURCES = path.join(__dirname + "/res/public")
    const HTML_RESOURCES = RESOURCES + "/index1.html"

    app.use(cors())
    app.use(express.static(RESOURCES))

    app.get("/", (req: Request, res: Response) => res.sendFile(HTML_RESOURCES))

    server.listen(8000)

    wss.on("headers", (headers, req) => {
      console.log({headers})
    })

    wss.on("connection", (ws, req) =>{
      var count = 0
      setInterval(() => {
        ws.send("Ping " + count++)
      }, 1000)
      // ws.onmessage = event => console.log(event.data)
    })
  }
}
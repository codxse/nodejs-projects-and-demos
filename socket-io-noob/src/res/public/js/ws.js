var ws = new WebSocket("ws://localhost:8000");
var count = 0
ws.onmessage = function (event) {
    console.log(event.data);
}
setInterval(() => {
    ws.send("Pong " + count--);
})
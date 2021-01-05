var socket = io("ws://localhost:8001");
socket.on("connect", function (data, req) {
    socket.on("welcome", function (message) {
        console.log(message)
    });
    socket.emit("message", {
        data: "I am from clinet"
    });
});
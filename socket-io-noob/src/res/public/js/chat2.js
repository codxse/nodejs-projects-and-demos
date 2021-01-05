var socket = io("http://localhost:8003");
var socket2 = io("http://localhost:8003/admin");

socket2.on("connect", function (event) {
    socket2.on("newMessageFromAdmin", function (data) {
        console.log({data})
    });
});

socket.on("messageFromServer", function (data) {
    socket.emit("messageToServer", { data: "this is from clinet" });
});

socket.on("newMessageFromServer", function (data) {
    document.querySelector("#messages").innerHTML += `<li>${data.text}</li>`;
});

socket.on("joined", function (message) {
    console.log(message)
})

var form = document.querySelector("#message-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.querySelector("#user-message");
    var newMessage = input.value;
    socket.emit("newMessageFromClient", {text: newMessage});
    input.value = "";
});
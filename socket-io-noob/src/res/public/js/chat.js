var socket = io("http://localhost:8002");
var socket2 = io("http://localhost:8002/admin");
var socket3 = io("http://localhost:8002/marketing");

socket2.on("connect", function (event) {
    console.log(socket2.id)
    socket2.on("newMessageFromAdmin", function (data) {
        console.log({data})
    })
});

socket.on("messageFromServer", function (data) {
    console.log({data});
    socket.emit("messageToServer", { data: "this is from clinet" });
});

var form = document.querySelector("#message-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.querySelector("#user-message");
    var newMessage = input.value;
    socket.emit("newMessageFromClient", {text: newMessage});
    input.value = "";
});

socket.on("connect", function (event) {
    console.log(socket.id)
})

socket.on("newMessageFromServer", function (data) {
    console.log(data);
    document.querySelector("#messages").innerHTML += `<li>${data.text}</li>`;
});
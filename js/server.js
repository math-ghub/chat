const WebSocket = require("ws");

const socket = new WebSocket.Server({port: 8080});

const users = [];

socket.on("connection", (user) => {
    console.log("Cliente conectou-se!");
    users.push(user);
    console.log(`${users.length} Clientes conectados!`);

    user.on("message", (info) => {
        console.log(info.toString());
        users.forEach((person) => {
            if (person != user) {
                person.send(info.toString());
            }
        })
    })

    user.on("close", () => {
        users.forEach((p, i) => {
            if (p == user) {
                users.splice(i, 1);
                console.log("Usuário encontrado e retirado!")
            }
        })
        console.log(users.length);
    })
})
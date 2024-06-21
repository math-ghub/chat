const WebSocket = require("ws");
const http = require("http");
const socket = new WebSocket.Server({port: 8080});
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    console.log("Cliente Conectado com sucesso!");
    const url = req.url;
    console.log(url);
    if (url == "/") {
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        fs.readFile("../index.html", "utf-8", (err, data) => {
            res.end(data);
        })
    } else {
        const file = ".." + url;
        const extName = path.extname(file);
        res.writeHead(200, {"Content-type": "text/" + extName.substring(1)});
        fs.readFile(file, "utf-8", (err, data) => {
            res.end(data);
        })
    }
})

server.listen(8221, () => {
    console.log("Servidor funcionando!");
})

const users = [];

socket.on("connection", (user) => {
    console.log("Cliente conectou-se!");
    users.push(user);
    console.log(`${users.length} Clientes conectados!`);

    user.on("message", (info) => {
        const vals = JSON.parse(info);
        console.log(vals);
        users.forEach((person) => {
            if (person != user) {
                person.send(JSON.stringify(vals));
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
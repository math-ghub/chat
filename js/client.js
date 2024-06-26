const chatContainer = document.querySelector("#chat-container");
const txtInput = document.querySelector("#message-sender");
const localUser = document.querySelector("#usertext");
const ipBox = document.querySelector("#ip");
let replicateMessage;
let socket;

txtInput.addEventListener("keydown", (id) => {
    if (id.key == "Enter") {
        createMessage(txtInput.value, localUser.value, true);
        replicateMessage(txtInput.value);
        txtInput.value = "";
    }
})

ipBox.addEventListener("keypress", (v) => {
    if (v.key == "Enter") {
        if (socket) {socket.close()};
        socket = new WebSocket(`ws://${ipBox.value}:8080`);

        socket.onopen = () => {
            console.log("Conectado ao Servidor!");
        }
        
        socket.onmessage = (txt) => {
            const vals = JSON.parse(txt.data);
            createMessage(vals.text, vals.username, false);
        }

        replicateMessage = (txt) => {
            socket.send(JSON.stringify({text: txt, username: localUser.value}));
        }
    }
})

function createMessage(txt, user, self) {
    const box = document.createElement("div");
    const userName = document.createElement("h2");
    const msg = document.createElement("p");

    userName.textContent = user;
    msg.textContent = txt;

    box.appendChild(userName);
    box.appendChild(msg);

    if (self) {
        box.setAttribute("class", "mensagem-self");
    } else {
        box.setAttribute("class", "mensagem");
    }

    chatContainer.appendChild(box);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}
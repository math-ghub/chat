const socket = new WebSocket("ws://localhost:8080");

const chatContainer = document.querySelector("#chat-container");
const txtInput = document.querySelector("#message-sender");
const localUser = document.querySelector("#usertext");

txtInput.addEventListener("keydown", (id) => {
    if (id.key == "Enter") {
        createMessage(txtInput.value, localUser.value);
        replicateMessage(txtInput.value);
        txtInput.value = "";
    }
})

socket.onopen = () => {
    console.log("Conectado ao Servidor!");
}

socket.onmessage = (txt) => {
    const vals = JSON.parse(txt.data);
    createMessage(vals.text, vals.username);
}

function replicateMessage(txt) {
    socket.send(JSON.stringify({text: txt, username: localUser.value}));
}

function createMessage(txt, user) {
    const box = document.createElement("div");
    const userName = document.createElement("h2");
    const msg = document.createElement("p");

    userName.textContent = user;
    msg.textContent = txt;

    box.appendChild(userName);
    box.appendChild(msg);

    box.setAttribute("class", "mensagem");

    chatContainer.appendChild(box);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}
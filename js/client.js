const socket = new WebSocket("ws://localhost:8080");

const chatContainer = document.querySelector("#chat-container");
const txtInput = document.querySelector("#message-sender");

txtInput.addEventListener("keydown", (id) => {
    if (id.key == "Enter") {
        createMessage(txtInput.value);
        replicateMessage(txtInput.value);
    }
    if (id.key == "L") {
        socket.close();
    }
})

socket.onopen = () => {
    console.log("Conectado ao Servidor!");
}

socket.onmessage = (txt) => {
    createMessage(txt.data);
}

function replicateMessage(txt) {
    socket.send(txt);
}

function createMessage(txt) {
    const box = document.createElement("div");
    box.setAttribute("class", "mensagem");
    box.textContent = txt;

    chatContainer.appendChild(box);
}
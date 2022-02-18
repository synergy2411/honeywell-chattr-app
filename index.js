const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3030;
const io = require("socket.io")(server);

io.on("connection", client => {
    console.log("Client Connected");
    client.emit("acknowledge", {message : "You are now connected!"})
    client.on("MsgToServer", (chatterName, message) => {
        console.log(chatterName + " Says : ", message);
        client.emit("MsgToClient", "Me", message);
        client.broadcast.emit("MsgToClient", chatterName, message);
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})


server.listen(PORT, () => console.log("Socket Server started at PORT : " + PORT))
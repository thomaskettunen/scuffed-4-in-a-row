const express = require('express');
const app = express();
const http = require("http");
const fs = require('fs');

let path = fs.realpathSync('./');

app.use(express.static('public'));

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path + "\\public\\main.html");
});

io.on("connection", (socket) => {
  console.log("user has connected");
});

server.listen(port, () => {
  console.log(`listening on ` + port);
})
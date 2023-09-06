const express = require("express");
const app = express();

const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8880 });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.set("view engine", "ejs");

server.on("connection", (ws) => {
  console.log("Client SENDER connesso a server INDEX");

  ws.on("message", (message) => {

    server.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(`${message}`);
        }
    });
  });
});

app.get("/", (req, res) => {
  let message;
  res.render("index", { message });
});

const sender = require("./routes/sender");

app.use("/sender", sender);

app.listen(2087);

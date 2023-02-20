const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const sockets = require("./sockets");
require("dotenv").config();

let io = sockets.startSocketServer(server);

app.set("socketio", io);

app.use(cors());

const router = express.Router();
app.use("/", router);

router.use((req, res) => {
	console.log("ROUTER 404");
	return res.status(404).json({ err: "404" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log(`Started on ${PORT}`);

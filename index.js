const app = require("express")();
const http = require("http").createServer(app);
const express = require("express");
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		transports: ["websocket", "polling"],
		credentials: true,
	},
	allowEIO3: true,
	maxHttpBufferSize: 1e8
});

app.use(express.static("client"));

var players = {};
var scores = { red: 0, blue: 0};

io.on("connection", (socket) => {

	players[socket.id] = {
		i: socket.id,
		team: undefined,
		name: undefined
	};

	socket.on('packet', (type, data) => {
		if (type == 1) {
			console.log(`${data.name} joined.`)
			players[socket.id].team = data.team
			players[socket.id].name = data.name;
		} else if(type == 2) {
            if(players[socket.id].team == 'red') {
                scores.red += 1;
            } else {
                scores.blue += 1;
            }
        }
	})

	socket.on('disconnect', () => {
		console.log(`${players[socket.id].name} disconnected.`)
		delete players[socket.id];
	})

});

setInterval(()=> {
    io.emit('scores',scores)
}, 100)

http.listen(8080, () => {
	console.log("server started");
});
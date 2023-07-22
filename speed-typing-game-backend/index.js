import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], methods: ["GET", "POST"] },
});

const activeUsers = [];

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ lobbyNo, wpm, username }) => {
    socket.join(lobbyNo);
    activeUsers.push({ socketId: socket.id, lobbyNo, wpm: 0, username });
    io.to(lobbyNo).emit("activeUsers", activeUsers);
  });
  socket.on("startTimer", (lobbyNo) => {
    let timer = 30;
    io.to(lobbyNo).emit("timerUpdate", timer);
    const timerInterval = setInterval(() => {
      timer--;
      io.to(lobbyNo).emit("timerUpdate", timer);
      if (timer === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  });

  // socket.on("resetTimer", (lobbyNo) => {
  //   const timerInterval = isTimerRunning(lobbyNo);
  //   if (timerInterval) {
  //     clearInterval(timerInterval);
  //     io.to(roomName).emit("timerUpdate", 30);
  //   }
  // });
  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
    const index = activeUsers.findIndex(
      (player) => player.socketId === socket.id
    );
    if (index !== -1) {
      const lobbyNo = activeUsers[index].lobbyNo;
      activeUsers.splice(index, 1);
      io.to(lobbyNo).emit("activeUsers", activeUsers.length);
    }
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});

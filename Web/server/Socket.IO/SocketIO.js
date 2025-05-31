const express = require("express")
const dotenv = require("dotenv")
const { Server } = require("socket.io")
dotenv.config({path:"./Config/config.env"})

const app = express()

const expressServer = app.listen(process.env.PORT,()=>{
    console.log("server is running");
})

const allowedOrigins = [
  process.env.CORS_PORT || "http://localhost:3000",
  "http://localhost:3001"
];

const io = new Server(expressServer,{
    cors:{
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
    
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
})

const users = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(users));
  console.log(users);
  

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

module.exports ={ app, io, app };
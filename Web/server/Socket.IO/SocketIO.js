const { Server } = require("socket.io");

const users = {};
let io;

const getReceiverSocketId = (receiverId) => users[receiverId];

const initSocket = (expressServer, allowedOrigins) => {
  io = new Server(expressServer, {
    cors: {
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
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      users[userId] = socket.id;
      console.log(`User connected: ${userId}`);
    }

    io.emit("getOnlineUsers", Object.keys(users));
    console.log("Current Users:", users);

    socket.on("manualLogout", ({ userId }) => {
      console.log(`Manual logout: ${userId}`);
      if (users[userId]) {
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      for (const [id, sockId] of Object.entries(users)) {
        if (sockId === socket.id) {
          delete users[id];
          break;
        }
      }
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });

  return io;
};

module.exports = { initSocket, getReceiverSocketId, getIO: () => io };

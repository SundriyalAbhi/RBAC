const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dns = require("dns");
const fs = require("fs");
const path = require("path");


dns.setServers(["8.8.8.8"]);

const { connectdb } = require("./Config/db");
const { testRedisConnection } = require("./Config/redis");
const { initSocket } = require("./Socket.IO/SocketIO");
const OTPRouter = require("./routes/OTPRoute");
const validateEmailRouter = require("./routes/ValidateEmailRouter");
const ComapnyRouter = require("./routes/CompanyRouter");
const AdminRouter = require("./routes/AdminRouter");
const ProviderRouter = require("./routes/ProviderRoute");
const MemberRouter = require("./routes/MemberRouter");
const ActivityRouter = require("./routes/ActivityRoute");
const SessionDataRouter = require("./routes/SessionDataRouter");
const SystemAnnouncementsRouter = require("./routes/SystemAnnouncementRoute");

const app = express();

const allowedOrigins = process.env.CORS_PORT
  ? process.env.CORS_PORT.split(",")
  : ["http://localhost:3000", "http://localhost:3001"];

console.log("Allowed Origins:", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS request from:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyparser.json({ limit: "30mb" }));
app.set("etag", false);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
}

app.get("/", (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    console.log(error);
  }
});

app.use("/Member", MemberRouter);
app.use("/otp", OTPRouter);
app.use("/checkEmail", validateEmailRouter);
app.use("/Provider", ProviderRouter);
app.use("/company", ComapnyRouter);
app.use("/admin", AdminRouter);
app.use("/activity", ActivityRouter);
app.use("/session", SessionDataRouter);
app.use("/SystemAnnouncements", SystemAnnouncementsRouter);

const startServer = async () => {
  console.log("1️⃣ startServer running");

  console.log("2️⃣ ENV:", {
    upstash_url: process.env.UPSTASH_REDIS_REST_URL ? "set" : "MISSING",
    upstash_token: process.env.UPSTASH_REDIS_REST_TOKEN ? "set" : "MISSING",
    port: process.env.PORT,
    mongo: process.env.MONGO_URI ? "set" : "MISSING",
  });

  console.log("3️⃣ calling testRedisConnection...");
  await testRedisConnection();
  console.log("4️⃣ Redis done");

  connectdb();
  console.log("5️⃣ DB connected");

  const expressServer = app.listen(process.env.PORT, () => {
    console.log("6️⃣ server is running on port", process.env.PORT);
  });

  initSocket(expressServer, allowedOrigins);
};

startServer().catch((err) => {
  console.error("💥 startServer crashed:", err.message);
  console.error(err.stack);
});


startServer();

module.exports = { app };

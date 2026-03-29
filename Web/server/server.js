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
  await testRedisConnection();
  connectdb();

  const expressServer = app.listen(process.env.PORT, () => {
    console.log("server is running");
  });

  initSocket(expressServer, allowedOrigins);
};

startServer();

module.exports = { app };
